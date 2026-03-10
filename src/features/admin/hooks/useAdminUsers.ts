import { useState, useEffect } from 'react';
import type { AdminUser } from '../types/admin.types';
const MOCK: AdminUser[] = [{id:'1',email:'test@example.com',displayName:'Test User',role:'student',xp:250,createdAt:'2025-01-01'},{id:'2',email:'admin@example.com',displayName:'Admin',role:'admin',xp:5000,createdAt:'2024-12-01'}];
export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ setTimeout(()=>{ setUsers(MOCK); setLoading(false); },300); },[]);
  return { users, loading };
}
