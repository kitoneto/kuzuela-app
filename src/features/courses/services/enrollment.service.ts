import { coursesService } from './courses.service';

export class EnrollmentService {
  async enroll(courseId: string, _userId: string): Promise<void> {
    await coursesService.enrollCourse(courseId);
  }

  async unenroll(_courseId: string, _userId: string): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
  }
}

export const enrollmentService = new EnrollmentService();
