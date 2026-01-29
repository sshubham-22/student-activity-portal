'use client'

import { CourseCard } from '../../components/courses/CourseCard'
import { useCourses } from '@/app/hooks/useQuery'

export default function CoursesPage() {
  const { data, isLoading, error } = useCourses()
  console.log(data)

 

  if (isLoading) return <p className="p-6">Loading courses...</p>
  if (error)
    return <p className="p-6 text-red-500">Failed to load courses</p>

  return (
    <div className="space-y-6 ">
      <header>
        <h1 className="text-2xl font-semibold text-black">Courses</h1>
        <p className="text-neutral-600 mt-1">
          View and manage your courses
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
