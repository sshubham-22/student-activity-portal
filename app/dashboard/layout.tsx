'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Loading from './Loading'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import EqualIcon from '@mui/icons-material/DragHandle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import { Input } from "@/components/ui/input"
import { useUser } from '../hooks/useUser'
import { User } from '@supabase/supabase-js'
import { useStudent } from '../hooks/useStudent'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const { user } = useUser() as {
    user: User | null
    loading: boolean
  }
  const userId = user?.id
  const { data: student } = useStudent(userId)


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
    { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { label: "Courses", href: "/dashboard/courses", icon: ListIcon },
    { label: "Attendance", href: "/dashboard/attendance", icon: CalendarTodayIcon },
    { label: "Grades", href: "/dashboard/grades", icon: EqualIcon },
    { label: "Payment Info", href: "/dashboard/payment", icon: PaymentIcon },
    { label: "Registration", href: "/dashboard/registration", icon: EditIcon },
    { label: "Drop Semester", href: "/dashboard/drop", icon: CloseIcon },
    { label: "Notice", href: "/dashboard/notice", icon: ChatBubbleIcon },
    { label: "Logout", href: "#", icon: LogoutIcon, action: 'logout' },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const handleNavClick = (item: typeof NavItems[0]) => {
    if (item.action === 'logout') {
      handleSignOut()
    }
  }

  return (
    <div className="min-h-screen flex p-1">
      <aside className="w-64  rounded-xl bg-gradient-to-t from-violet-700 via-violet-600 to-violet-400 pt-12 ">
        <div className="h-24 flex items-center justify-center px-6 border-b  border-violet-400">
          <div className='w-25 h-20 bg-violet-500 rounded-xl mb-4 '>
          <SchoolIcon className="text-white ml-2 " style={{ fontSize: 80}} />
          </div>
          
        </div>

        <nav className="p-4 space-y-1">
          {NavItems.map(item => {
            const isActive = pathname === item.href
            const IconComponent = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.action === 'logout') {
                    e.preventDefault()
                    handleNavClick(item)
                  }
                }}
                className={clsx(
                  'px-4 py-3 rounded-lg text-sm flex items-center gap-3 transition-colors',
                  isActive
                    ? 'bg-violet-400 text-white font-semibold'
                    : 'text-white hover:bg-violet-400/50'
                )}
              >
                <IconComponent style={{ fontSize: 20 }} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex-1 flex justify-center">
            <div className="relative w-96">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
              <Input 
                type="search" 
                placeholder="Search" 
                className="pl-10 w-full bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <NotificationsIcon className="text-gray-600" style={{ fontSize: 24 }} />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center border-2 border-violet-500">
                <Image
                  src="/pfp.png"
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {student?.name || 'John Doe'}
                </span>
                <span className="text-xs text-gray-500">
                  3rd year
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
