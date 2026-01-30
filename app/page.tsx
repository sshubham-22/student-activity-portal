import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-neutral-100 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-violet-200 p-8 flex flex-col gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Student Academic Portal
          </h1>
          <p className="text-sm text-neutral-600">
            Track courses, attendance, grades and more
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative w-40 h-40 rounded-full bg-violet-100 flex items-center justify-center">
            <Image
              src="/portal.png"
              alt="Student illustration"
              width={120}
              height={120}
              priority
            />
          </div>
        </div>

        <Link
          href="/login"
          className="group flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          Start Tracking
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <p className="text-center text-xs text-neutral-500">
          Secure login • Powered by Supabase
        </p>
      </div>
    </main>
  )
}
