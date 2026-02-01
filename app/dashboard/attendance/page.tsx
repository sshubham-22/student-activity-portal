'use client'

import { useState, useMemo } from 'react'
import { useAuth } from "@/app/components/authProvider"
import { useAttendance } from '@/app/hooks/useAttendace'
import { useCourses } from '@/app/hooks/useQuery'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import FilterListIcon from '@mui/icons-material/FilterList'

export default function AttendancePage() {
  const { user } = useAuth()
  const { data, isLoading, error } = useAttendance(user?.id ?? '')
  const { data: courses } = useCourses()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

 
  const courseMap = useMemo(() => {
    if (!courses) return new Map()
    const map = new Map()
    courses.forEach(course => {
      
      map.set(String(course.id), course)
    })
    return map
  }, [courses])

  
  const filteredData = useMemo(() => {
    if (!data) return []
    
    let filtered = [...data]
    
    if (startDate) {
      filtered = filtered.filter(att => att.date >= startDate)
    }
    
    if (endDate) {
      filtered = filtered.filter(att => att.date <= endDate)
    }
    
    return filtered
  }, [data, startDate, endDate])


  const stats = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return { total: 0, present: 0, absent: 0, percentage: 0 }
    }
    
    const total = filteredData.length
    const present = filteredData.filter(att => att.status === 'present').length
    const absent = total - present
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0
    
    return { total, present, absent, percentage }
  }, [filteredData])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCourseName = (courseId: string | number) => {
    const course = courseMap.get(String(courseId))
    return course ? `${course.code} - ${course.title}` : `Course ${courseId}`
  }

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
  }

  if (isLoading) return <p className="p-6">Loading attendance...</p>
  if (error) return <p className="p-6 text-red-500">Failed to load attendance</p>

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-800">Attendance</h1>
        <p className="text-gray-600 mt-1">
          Track your attendance records and statistics
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Classes</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
              <CalendarTodayIcon className="text-violet-500" style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircleIcon className="text-green-600" style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <CancelIcon className="text-red-600" style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-white">{stats.percentage}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <CalendarTodayIcon className="text-white" style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-45 rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold cursor-pointer "
          >
            <FilterListIcon style={{ fontSize: 20 }} />
            <span>Filter by Date</span>
          </button>
          {(startDate || endDate) && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map(att => (
                  <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(att.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {getCourseName(att.course_id)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          att.status === 'present'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {att.status === 'present' ? (
                          <CheckCircleIcon className="mr-1" style={{ fontSize: 14 }} />
                        ) : (
                          <CancelIcon className="mr-1" style={{ fontSize: 14 }} />
                        )}
                        {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <CalendarTodayIcon className="mx-auto mb-2" style={{ fontSize: 48, opacity: 0.3 }} />
                      <p className="text-lg font-medium">No attendance records found</p>
                      <p className="text-sm mt-1">
                        {(startDate || endDate) 
                          ? 'Try adjusting your date filters' 
                          : 'Your attendance records will appear here'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
