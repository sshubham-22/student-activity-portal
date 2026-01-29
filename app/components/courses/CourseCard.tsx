'use client'

import { Course } from '@/app/lib/api/courses'
import StatusBadge from './Status'

interface Props {
  course: Course
}

export function CourseCard({ course }: Props) {
  const isEnrolled = course.status === 'active'
  const isCompleted = course.status === 'archived'

  return (
    <div className="rounded-xl border bg-violet-200 border-3 border-violet-500 shadow-2xl p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{course.title}</h3>
          <p className="text-sm text-neutral-800">
            {course.code} • {course.credits} credits
          </p>
        </div>

        <StatusBadge status={course.status} />
      </div>

      <p className="text-sm text-neutral-800">
        Instructor: {course.instructor}
      </p>

      <div className="pt-2">
        {isCompleted ? (
          <span className="text-sm font-bold text-green-500">
            Completed
          </span>
        ) : (
          <button
            className="px-3 py-1.5 rounded-md text-sm bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
          >
            {isEnrolled ? 'Drop Course' : 'Enroll'}
          </button>
        )}
      </div>
    </div>
  )
}


