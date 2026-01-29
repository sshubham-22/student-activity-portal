'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CurrentDate from '../utils/currentDate'
import { useCourses } from '@/app/hooks/useQuery'
import Instructors from '../components/dashboard/Instructors'
import FinanceCard from '../components/dashboard/FinanceCard'
import { useStudent } from '../hooks/useStudent'
import { useUser } from '../hooks/useUser'
import { User } from '@supabase/supabase-js'


export default function DashboardPage() {
  const router = useRouter()
  const { data, isLoading, error } = useCourses()
  const [showAllInstructors, setShowAllInstructors] = useState(false)
  const { user, loading: userLoading } = useUser() as {
    user: User | null
    loading: boolean
  }
  // useEffect(() => {
  //   if (!userLoading && !user) {
  //     router.replace('/login')
  //   }
  // }, [userLoading, user, router])
  const userId = user?.id
  const { data: student, isLoading: studentLoading } = useStudent(userId)
  

  // console.log(student)

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
    : instructors.slice(0, 5)

    if (userLoading) {
      return null 
    }
  
    if (!user) {
      return null
    }

  if (isLoading) return <p className="p-6">Loading dashboard...</p>
  
  if (error) return <p className="p-6 text-red-500">Failed to load dashboard</p>

  return (
    <div className="flex flex-col gap-10">

    
      <div className="flex flex-1 p-5 rounded-xl bg-violet-500">
        <div className="flex flex-col">
          <div className="text-white p-2 ml-1">
            <CurrentDate />
          </div>

          <div className="font-bold text-white text-xl p-3 mt-6">
              Welcome back {student?.name ?? 'Student'}!
          </div>

          <div className="font-semibold text-gray-300 text-sm p-3 -mt-5">
            Always stay updated on your student portal
          </div>
        </div>

        <div className="ml-auto w-35 h-35 rounded-full bg-violet-500">
          <Image
            src="/pfp.png"
            alt="profile"
            width={130}
            height={130}
            className="rounded-full p-1 ml-1 mt-3"
          />
        </div>
      </div>

      <div className="flex gap-10">      
        <div className="flex flex-col gap-5">

          <div>
            <div className="font-bold p-2 text-md">Finances</div>
            <div className="flex gap-6">
              <FinanceCard title="Total Payable" amount="$10,000" />
              <FinanceCard title="Total Paid" amount="$5,000" active />
              <FinanceCard title="Others" amount="$300" />
            </div>
          </div>

          
          <div>
            <div className="font-bold p-2 text-md">Daily Notice</div>

            <div className="flex gap-3 h-60">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-1/3 bg-violet-200 border-4 border-violet-500 rounded-xl shadow-xl p-3"
                >
                  <div className="font-semibold text-center mb-2">
                    Lorem Ipsum
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem adipisci, cumque ratione iste aperiam similique.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptas accusamus eveniet possimus labore quibusdam perferendis. Vitae voluptatibus soluta aliquam dolor cumque aperiam, magni dicta! Sit soluta maiores mollitia commodi!
                  </p>
                  <div className='rounded-xl bg-violet-700 w-15 h-10 p-2 ml-auto text-white cursor-pointer'>
                    <div className='ml-1'>
                    View
                    </div>

                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 w-60 ml-auto">
          <div>
            <div className="text-black font-bold text-md mb-2">
              Your Instructors
            </div>

            <div className="flex flex-col gap-2">
              {visibleInstructors.map(course => (
                <Instructors key={course.id} course={course} />
              ))}

              {instructors.length > 5 && (
                <button
                  onClick={() => setShowAllInstructors(prev => !prev)}
                  className="mt-2 text-sm text-violet-600 hover:underline self-start cursor-pointer"
                >
                  {showAllInstructors ? 'View less' : 'View all'}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
