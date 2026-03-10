import { useState, useEffect } from 'react';
import type { AdminCourse } from '../types/admin.types';
const MOCK: AdminCourse[] = [{id:'1',title:'English for Beginners',level:'A1',totalLessons:30,isPublished:true},{id:'2',title:'French Essentials',level:'A1',totalLessons:25,isPublished:true}];
export function useAdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ setTimeout(()=>{ setCourses(MOCK); setLoading(false); },300); },[]);
  return { courses, loading };
}
