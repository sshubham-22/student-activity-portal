export type CourseStatus = 'active' | 'archived'

export interface Course {
  id: string
  code: string
  title: string
  credits: number
  instructor: string
  status: CourseStatus
}
