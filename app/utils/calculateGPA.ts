import { Grade, LetterGrade } from '../types/grade'

const GRADE_POINTS: Record<LetterGrade, number> = {
  A: 10,
  'A-': 9,
  'B+': 8,
  B: 7,
  'B-': 6,
  C: 5,
  D: 4,
  F: 0,
}

export function calculateGPA(grades: Grade[]): number {
  let totalPoints = 0
  let totalCredits = 0

  for (const grade of grades) {
    totalPoints += GRADE_POINTS[grade.grade] * grade.credits
    totalCredits += grade.credits
  }

  return totalCredits === 0
    ? 0
    : Number((totalPoints / totalCredits).toFixed(2))
}
