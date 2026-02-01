'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import LaptopIcon from '@mui/icons-material/Laptop'
import BarChartIcon from '@mui/icons-material/BarChart'

import CurrentDate from '../utils/currentDate'
import { useCourses } from '@/app/hooks/useQuery'
import FinanceCard from '../components/dashboard/FinanceCard'
import { useStudent } from '../hooks/useStudent'
import { useUser } from '../hooks/useUser'
import { User } from '@supabase/supabase-js'


export default function DashboardPage() {
  const { data, isLoading, error } = useCourses()
  const [showAllInstructors, setShowAllInstructors] = useState(false)
  const { user, loading: userLoading } = useUser() as {
    user: User | null
    loading: boolean
  }
  const userId = user?.id
  const { data: student } = useStudent(userId)



  const enrolledCourses = useMemo(() => {
    if (!data) return []
    return data.filter(course => course.status === 'active').slice(0, 2)
  }, [data])

  const instructors = useMemo(() => {
    if (!data) return []

    return Array.from(
      new Map(
        data.map(course => [course.instructor, course])
      ).values()
    )
  }, [data])

  const visibleInstructors = showAllInstructors
    ? instructors
    : instructors.slice(0, 3)

  if (userLoading) {
    return null 
  }
  
  if (!user) {
    return null
  }

  if (isLoading) return <p className="p-6">Loading dashboard...</p>
  
  if (error) return <p className="p-6 text-red-500">Failed to load dashboard</p>

  const notices = [
    {
      title: "Prelim payment due",
      content: "Sorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      title: "Exam schedule",
      content: "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
    }
  ]

  return (
    <div className="flex flex-col gap-6">

      <div className="relative flex items-center justify-between p-8 rounded-xl bg-gradient-to-r from-violet-700 via-violet-5500 to-violet-400 overflow-hidden min-h-[200px]">
        <div className="flex flex-col z-10 relative">
          <div className="text-white mb-2 text-sm">
            <CurrentDate />
          </div>
          <div className="font-bold text-white text-4xl mb-2 capitalize">
            Welcome back, {student?.name || 'John'}!
          </div>
          <div className="font-semibold text-gray-200 text-sm">
            Always stay updated in your student portal
          </div>
          
        </div>
       <div>
        
       </div>
          <Image
            src="/3d-2.jpg"
            alt="profile"
            width={330}
            height={330}
            className="rounded-full  ml-1 mt-2 mr-8 bg-violet-600 scale-225"
          />
      

        
      </div>

      <div className="flex gap-6">      
        
        <div className="flex-1 flex flex-col gap-6">
         
          <div>
            <div className="font-bold text-lg mb-4 text-gray-800">Finance</div>
            <div className="flex gap-4">
              <FinanceCard title="Total Payable" amount="$ 10,000" type="payable" />
              <FinanceCard title="Total Paid" amount="$ 5,000" type="paid" active />
              <FinanceCard title="Others" amount="$ 300" type="others" />
            </div>
          </div>

         
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg text-gray-800">Enrolled Courses</div>
              <button className="text-sm text-violet-600 hover:underline font-semibold cursor-pointer">
                See all
              </button>
            </div>
            <div className="flex gap-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {index === 0 ? (
                      <LaptopIcon className="text-violet-500" style={{ fontSize: 32 }} />
                    ) : (
                      <BarChartIcon className="text-violet-500" style={{ fontSize: 32 }} />
                    )}
                    <div className="font-semibold text-gray-800">{course.title}</div>
                  </div>
                  <button className="w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors font-semibold text-sm cursor-pointer">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="w-80 flex flex-col gap-6">
         
          <div>
            <div className="font-bold text-lg mb-4 text-gray-800">Course instructors</div>
            <div className="flex flex-wrap gap-3">
              {visibleInstructors.map((course) => (
                <div key={course.id} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-violet-500 overflow-hidden">
                    <Image
                      src="/teacher.jpeg"
                      alt={course.instructor}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            {instructors.length > 3 && (
              <button
                onClick={() => setShowAllInstructors(prev => !prev)}
                className="mt-3 text-sm text-violet-600 hover:underline font-semibold cursor-pointer"
              >
                {showAllInstructors ? 'View less' : 'See all'}
              </button>
            )}
          </div>

          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg text-gray-800">Daily notice</div>
              <button className="text-sm text-violet-600 hover:underline font-semibold cursor-pointer">
                See all
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="bg-white  rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="font-semibold text-gray-800 mb-2">{notice.title}</div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {notice.content}
                  </p>
                  <button className="text-sm text-violet-600 hover:underline font-semibold cursor-pointer">
                    See more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
