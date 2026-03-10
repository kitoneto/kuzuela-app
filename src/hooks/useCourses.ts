import { useAppContext } from '../contexts/AppContext';
export function useCourses() {
  const { courses, loadingCourses, refreshCourses } = useAppContext();
  return { courses, loading: loadingCourses, refreshCourses };
}
