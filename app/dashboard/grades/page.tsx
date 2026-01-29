'use client'

import { mockGrades } from '../../services/mockGradeData'
import { GradeTable } from '../../components/grades/GradeTable'
import { calculateGPA } from '../../utils/calculateGPA'
import { useMemo } from 'react'

export default function GradesPage() {
  const gpa = useMemo(() => {
    return calculateGPA(mockGrades)
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Grades</h1>
          <p className="text-neutral-600 mt-1">
            Academic performance overview
          </p>
        </div>

        <div className="bg-white border rounded-lg px-4 py-3 text-center">
          <div className="text-xs text-neutral-500">
            CGPA
          </div>
          <div className="text-2xl font-semibold">
            {gpa}
          </div>
        </div>
      </header>

      <GradeTable grades={mockGrades} />
    </div>
  )
}
