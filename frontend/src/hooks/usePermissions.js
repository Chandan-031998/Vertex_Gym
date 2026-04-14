import { useMemo } from 'react';
import { useAuth } from './useAuth';

const permissionMap = {
  super_admin: ['dashboard', 'members', 'trainers', 'membership', 'attendance', 'payments', 'reports', 'settings', 'classes', 'workout', 'diet', 'staff', 'equipment', 'inventory', 'notifications'],
  admin: ['dashboard', 'members', 'trainers', 'membership', 'attendance', 'payments', 'reports', 'settings', 'classes', 'workout', 'diet', 'staff', 'equipment', 'inventory', 'notifications'],
  receptionist: ['dashboard', 'members', 'membership', 'attendance', 'payments', 'classes', 'notifications'],
  trainer: ['dashboard', 'members', 'trainers', 'classes', 'workout', 'diet'],
  member: ['dashboard']
};

export default function usePermissions() {
  const { user } = useAuth();
  return useMemo(() => {
    const permissions = permissionMap[user?.role] || [];
    return {
      permissions,
      canAccess: (key) => permissions.includes(key),
      canView: true,
      canEdit: !['member'].includes(user?.role)
    };
  }, [user]);
}
