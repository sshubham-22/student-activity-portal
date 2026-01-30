'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Loading from './Loading'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useUser } from '../hooks/useUser'
import { User } from '@supabase/supabase-js'
import { useStudent } from '../hooks/useStudent'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, loading: userLoading } = useUser() as {
    user: User | null
    loading: boolean
  }
  const userId = user?.id
  const { data: student, isLoading: studentLoading } = useStudent(userId)


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/login')
      } else {
        setChecking(false)
      }
    })
  }, [router])

  if (checking) {
    return <Loading />
  }

  const NavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Courses", href: "/dashboard/courses" },
    { label: "Grades", href: "/dashboard/grades" },
    { label: "Attendance", href: "/dashboard/attendance" },
    { label: "Timetable", href: "/dashboard/timetable" },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <div className="min-h-screen flex p-3">
      <aside className="w-45 bg-violet-500 border-r border-neutral-200 rounded-xl">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-white">Student Portal</span>
        </div>

        <nav className="p-4 space-y-2">
          {NavItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm block transition',
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-900 font-semibold hover:bg-neutral-100'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 relative">
          <span className="text-lg font-semibold text-neutral-600">
            Welcome, {student ? student.name.toUpperCase() : "Student" }
          </span>
          <div className='mr-8'>
            <Field orientation="horizontal">
              <Input type="search" placeholder="Search..." className='w-90'/>
              <Button className='cursor-pointer bg-violet-500 border-2 border-violet-500 text-white'>Search</Button>
            </Field>

          </div>


          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full hover:bg-neutral-100 p-1"
            >
              <div className="h-12 w-12 rounded-full bg-neutral-300 flex items-center justify-center border-3 border-violet-500 cursor-pointer">
                <span className="text-sm font-semibold text-violet-500 cursor-pointer">{student?.name[0].toUpperCase()}</span>
              </div>
            </button>

            {profileOpen && (

              <button
                onClick={handleSignOut}
                className="absolute right-0 w-full text-left px-4 py-2 hover:bg-neutral-400 rounded-xl w-20 bg-neutral-300 text-s cursor-pointer"
              >
                <div className='flex mr-auto p-1 '>
                  <LogoutIcon />

                </div>

              </button>

            )}
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
