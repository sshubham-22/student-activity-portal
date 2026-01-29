'use client'

import { useAuth } from "@/app/components/authProvider"
import { useAttendance } from '@/app/hooks/useAttendace'

export default function AttendancePage() {
  const { user } = useAuth()
  const { data, isLoading, error } = useAttendance(user?.id ?? '')

  if (isLoading) return <p className="p-6">Loading attendance...</p>
  if (error) return <p className="p-6 text-red-500">Failed to load attendance</p>

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Attendance</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-neutral-100">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(att => (
              <tr key={att.id} className="border-b">
                <td className="px-4 py-2 text-center">{att.date}</td>
                <td className="px-4 py-2 text-center">{att.course_id}</td>
                <td className={`px-4 py-2 font-medium text-center ${att.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>
                  {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
