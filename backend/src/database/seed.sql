INSERT INTO users (full_name, email, password, role, phone, status)
VALUES
('Super Admin', 'admin@gymerp.com', 'Admin@123', 'admin', '9999999999', 'active')
ON DUPLICATE KEY UPDATE email=email;

INSERT INTO membership_plans (plan_name, duration_days, price, description, status)
VALUES
('Monthly Plan', 30, 1500.00, 'Monthly gym access', 'active'),
('Quarterly Plan', 90, 4000.00, 'Quarterly access', 'active'),
('Yearly Plan', 365, 14000.00, 'Annual access', 'active')
ON DUPLICATE KEY UPDATE plan_name=VALUES(plan_name);

INSERT INTO trainers (full_name, email, phone, specialization, experience_years, salary, availability_notes, status)
VALUES
('Rahul Fitness', 'rahul@gymerp.com', '9000000001', 'Strength Training', 5, 28000.00, 'Morning and evening batches', 'active'),
('Sneha Yoga', 'sneha@gymerp.com', '9000000002', 'Yoga', 4, 26000.00, 'Morning wellness sessions', 'active')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

INSERT INTO members (member_code, full_name, email, phone, gender, joining_date, status, assigned_trainer_id, current_weight, current_goal, qr_code, qr_token)
VALUES
('MEM001', 'Arjun Kumar', 'arjun@example.com', '9111111111', 'male', CURDATE(), 'active', 1, 78.50, 'Lose 5kg in 60 days', 'MEM001', 'seedtoken_mem001_please_change'),
('MEM002', 'Priya Nair', 'priya@example.com', '9222222222', 'female', CURDATE(), 'active', 2, 61.20, 'Improve flexibility and stamina', 'MEM002', 'seedtoken_mem002_please_change')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

INSERT INTO member_memberships (member_id, plan_id, start_date, end_date, amount, payment_status, status, notes)
SELECT 1, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 1500.00, 'paid', 'active', 'Seed membership'
WHERE EXISTS (SELECT 1 FROM members WHERE id=1)
LIMIT 1;

INSERT INTO payments (member_id, membership_id, amount, payment_date, payment_method, reference_no, notes, invoice_number, status)
SELECT 1, (SELECT id FROM member_memberships WHERE member_id = 1 ORDER BY id DESC LIMIT 1), 1500.00, CURDATE(), 'cash', 'INIT001', 'Seed payment', CONCAT('INV-', UNIX_TIMESTAMP()), 'paid'
WHERE EXISTS (SELECT 1 FROM members WHERE id=1)
LIMIT 1;

INSERT INTO attendance (member_id, check_in_time, check_out_time, entry_type, notes)
SELECT 1, NOW(), NULL, 'manual', 'Seed attendance'
WHERE EXISTS (SELECT 1 FROM members WHERE id = 1)
LIMIT 1;
