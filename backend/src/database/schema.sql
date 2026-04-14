CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin','receptionist','trainer','member','accountant','inventory_manager') NOT NULL DEFAULT 'admin',
  phone VARCHAR(20),
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  reset_token VARCHAR(255),
  reset_token_expires_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_code VARCHAR(30) NOT NULL UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  gender ENUM('male','female','other'),
  dob DATE,
  address TEXT,
  emergency_contact_name VARCHAR(150),
  emergency_contact_phone VARCHAR(20),
  medical_notes TEXT,
  joining_date DATE NOT NULL,
  status ENUM('active','inactive','expired','paused') NOT NULL DEFAULT 'active',
  assigned_trainer_id INT,
  current_weight DECIMAL(5,2),
  current_goal VARCHAR(150),
  qr_code VARCHAR(120),
  qr_token VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trainers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  specialization VARCHAR(150),
  experience_years INT DEFAULT 0,
  salary DECIMAL(10,2) DEFAULT 0,
  availability_notes TEXT,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS membership_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_name VARCHAR(150) NOT NULL,
  duration_days INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  freeze_limit_days INT DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member_memberships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  plan_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('paid','partial','due') DEFAULT 'paid',
  status ENUM('active','expired','paused') DEFAULT 'active',
  notes TEXT,
  freeze_start_date DATE,
  freeze_end_date DATE,
  paused_days INT DEFAULT 0,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  check_in_time DATETIME NOT NULL,
  check_out_time DATETIME,
  entry_type ENUM('manual','qr','biometric') DEFAULT 'manual',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method ENUM('cash','card','upi','bank_transfer') NOT NULL,
  reference_no VARCHAR(100),
  notes TEXT,
  invoice_number VARCHAR(100) NOT NULL,
  membership_id INT,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  status ENUM('paid','partial','due') DEFAULT 'paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (membership_id) REFERENCES member_memberships(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(150) NOT NULL,
  trainer_id INT,
  class_date DATE,
  start_time TIME,
  end_time TIME,
  capacity INT DEFAULT 20,
  status ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled',
  description TEXT,
  batch_name VARCHAR(150),
  room_name VARCHAR(120),
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS class_bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_id INT NOT NULL,
  member_id INT NOT NULL,
  booking_status ENUM('booked','waitlisted','cancelled') DEFAULT 'booked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  trainer_id INT,
  goal VARCHAR(150),
  plan_text TEXT,
  plan_name VARCHAR(150),
  status ENUM('active','completed','paused') DEFAULT 'active',
  progress_percent INT DEFAULT 0,
  target_date DATE,
  assigned_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS diet_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  trainer_id INT,
  goal VARCHAR(150),
  plan_text TEXT,
  plan_name VARCHAR(150),
  calories INT DEFAULT 0,
  protein_grams INT DEFAULT 0,
  carbs_grams INT DEFAULT 0,
  fat_grams INT DEFAULT 0,
  status ENUM('active','completed','paused') DEFAULT 'active',
  assigned_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  role VARCHAR(100),
  email VARCHAR(150),
  phone VARCHAR(20),
  salary DECIMAL(10,2) DEFAULT 0,
  status ENUM('active','inactive') DEFAULT 'active',
  shift_name VARCHAR(100),
  branch_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  equipment_name VARCHAR(150) NOT NULL,
  brand VARCHAR(100),
  purchase_date DATE,
  condition_status ENUM('good','maintenance_due','damaged') DEFAULT 'good',
  serial_number VARCHAR(100),
  purchase_cost DECIMAL(10,2) DEFAULT 0,
  last_service_date DATE,
  next_service_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment_maintenance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  equipment_id INT NOT NULL,
  maintenance_date DATE NOT NULL,
  next_due_date DATE,
  notes TEXT,
  maintenance_type VARCHAR(100),
  status VARCHAR(50),
  cost DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(150),
  address TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(150) NOT NULL,
  supplier_id INT,
  sku VARCHAR(50),
  quantity INT DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  low_stock_threshold INT DEFAULT 5,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS stock_movements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  movement_type ENUM('in','out') NOT NULL,
  quantity INT NOT NULL,
  movement_date DATE NOT NULL,
  notes TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  target_role VARCHAR(100),
  target_member_id INT,
  reminder_type VARCHAR(100),
  status VARCHAR(50),
  created_by INT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS branches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  branch_name VARCHAR(150) NOT NULL,
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shifts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  shift_name VARCHAR(120) NOT NULL,
  start_time TIME,
  end_time TIME,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff_attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  staff_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  status ENUM('present','absent','late','leave') DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_sales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_number VARCHAR(100) NOT NULL,
  customer_name VARCHAR(150),
  sale_date DATE NOT NULL,
  payment_method ENUM('cash','card','upi','bank_transfer') DEFAULT 'cash',
  total_amount DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reminder_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  target_name VARCHAR(150),
  reminder_type VARCHAR(100),
  due_date DATE,
  status VARCHAR(50) DEFAULT 'queued',
  sent_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
