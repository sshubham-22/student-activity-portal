import { Course } from '../types/course'

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    title: 'Introduction to Computer Science',
    credits: 4,
    instructor: 'Dr. Sharma',
    status: 'enrolled',
  },
  {
    id: '2',
    code: 'MA201',
    title: 'Linear Algebra',
    credits: 3,
    instructor: 'Dr. Mehta',
    status: 'completed',
  },
  {
    id: '3',
    code: 'CS305',
    title: 'Operating Systems',
    credits: 4,
    instructor: 'Dr. Rao',
    status: 'available',
  },
]
