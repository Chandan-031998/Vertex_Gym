import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import MembersList from '../pages/members/MembersList';
import MemberProfile from '../pages/members/MemberProfile';
import TrainersList from '../pages/trainers/TrainersList';
import TrainerProfile from '../pages/trainers/TrainerProfile';
import PlansList from '../pages/membership/PlansList';
import RenewMembership from '../pages/membership/RenewMembership';
import ExpiryMembers from '../pages/membership/ExpiryMembers';
import AttendanceList from '../pages/attendance/AttendanceList';
import CheckIn from '../pages/attendance/CheckIn';
import QRCheckIn from '../pages/attendance/QRCheckIn';
import AttendanceReports from '../pages/attendance/AttendanceReports';
import PaymentsList from '../pages/payments/PaymentsList';
import CollectPayment from '../pages/payments/CollectPayment';
import DuePayments from '../pages/payments/DuePayments';
import RevenueReports from '../pages/reports/RevenueReports';
import MembershipReports from '../pages/reports/MembershipReports';
import TrainerReports from '../pages/reports/TrainerReports';
import InventoryReports from '../pages/reports/InventoryReports';
import GeneralSettings from '../pages/settings/GeneralSettings';
import TaxSettings from '../pages/settings/TaxSettings';
import BranchSettings from '../pages/settings/BranchSettings';
import RolesPermissions from '../pages/settings/RolesPermissions';
import ProfileSettings from '../pages/settings/ProfileSettings';
import ClassesList from '../pages/classes/ClassesList';
import ClassBookings from '../pages/classes/ClassBookings';
import WorkoutPlans from '../pages/workout/WorkoutPlans';
import DietPlans from '../pages/diet/DietPlans';
import StaffList from '../pages/staff/StaffList';
import EquipmentList from '../pages/equipment/EquipmentList';
import ProductsList from '../pages/inventory/ProductsList';
import NotificationList from '../pages/notifications/NotificationList';
import SendNotification from '../pages/notifications/SendNotification';
import ReminderLogs from '../pages/notifications/ReminderLogs';
import NotFound from '../pages/notfound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<PrivateRoute permission="dashboard"><Dashboard /></PrivateRoute>} />
      <Route path="/members" element={<PrivateRoute permission="members"><MembersList /></PrivateRoute>} />
      <Route path="/members/:id" element={<PrivateRoute permission="members"><MemberProfile /></PrivateRoute>} />
      <Route path="/trainers" element={<PrivateRoute permission="trainers"><TrainersList /></PrivateRoute>} />
      <Route path="/trainers/:id" element={<PrivateRoute permission="trainers"><TrainerProfile /></PrivateRoute>} />
      <Route path="/membership/plans" element={<PrivateRoute permission="membership"><PlansList /></PrivateRoute>} />
      <Route path="/membership/renew" element={<PrivateRoute permission="membership"><RenewMembership /></PrivateRoute>} />
      <Route path="/membership/expiry" element={<PrivateRoute permission="membership"><ExpiryMembers /></PrivateRoute>} />
      <Route path="/attendance" element={<PrivateRoute permission="attendance"><AttendanceList /></PrivateRoute>} />
      <Route path="/attendance/check-in" element={<PrivateRoute permission="attendance"><CheckIn /></PrivateRoute>} />
      <Route path="/attendance/qr" element={<PrivateRoute permission="attendance"><QRCheckIn /></PrivateRoute>} />
      <Route path="/attendance/reports" element={<PrivateRoute permission="attendance"><AttendanceReports /></PrivateRoute>} />
      <Route path="/payments" element={<PrivateRoute permission="payments"><PaymentsList /></PrivateRoute>} />
      <Route path="/payments/collect" element={<PrivateRoute permission="payments"><CollectPayment /></PrivateRoute>} />
      <Route path="/payments/due" element={<PrivateRoute permission="payments"><DuePayments /></PrivateRoute>} />
      <Route path="/classes" element={<PrivateRoute permission="classes"><ClassesList /></PrivateRoute>} />
      <Route path="/classes/bookings" element={<PrivateRoute permission="classes"><ClassBookings /></PrivateRoute>} />
      <Route path="/workout/plans" element={<PrivateRoute permission="workout"><WorkoutPlans /></PrivateRoute>} />
      <Route path="/diet/plans" element={<PrivateRoute permission="diet"><DietPlans /></PrivateRoute>} />
      <Route path="/staff" element={<PrivateRoute permission="staff"><StaffList /></PrivateRoute>} />
      <Route path="/equipment" element={<PrivateRoute permission="equipment"><EquipmentList /></PrivateRoute>} />
      <Route path="/inventory/products" element={<PrivateRoute permission="inventory"><ProductsList /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute permission="notifications"><NotificationList /></PrivateRoute>} />
      <Route path="/notifications/send" element={<PrivateRoute permission="notifications"><SendNotification /></PrivateRoute>} />
      <Route path="/notifications/logs" element={<PrivateRoute permission="notifications"><ReminderLogs /></PrivateRoute>} />
      <Route path="/reports/revenue" element={<PrivateRoute permission="reports"><RevenueReports /></PrivateRoute>} />
      <Route path="/reports/membership" element={<PrivateRoute permission="reports"><MembershipReports /></PrivateRoute>} />
      <Route path="/reports/trainers" element={<PrivateRoute permission="reports"><TrainerReports /></PrivateRoute>} />
      <Route path="/reports/inventory" element={<PrivateRoute permission="reports"><InventoryReports /></PrivateRoute>} />
      <Route path="/settings/general" element={<PrivateRoute permission="settings"><GeneralSettings /></PrivateRoute>} />
      <Route path="/settings/tax" element={<PrivateRoute permission="settings"><TaxSettings /></PrivateRoute>} />
      <Route path="/settings/branches" element={<PrivateRoute permission="settings"><BranchSettings /></PrivateRoute>} />
      <Route path="/settings/roles" element={<PrivateRoute permission="settings"><RolesPermissions /></PrivateRoute>} />
      <Route path="/settings/profile" element={<PrivateRoute permission="settings"><ProfileSettings /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
