export type LetterGrade =
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C'
  | 'D'
  | 'F'

export interface Grade {
  id: string
  courseCode: string
  courseTitle: string
  credits: number
  grade: LetterGrade
  semester: string
}
