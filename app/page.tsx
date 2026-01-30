import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 justify-center bg-neutral-100 h-70  border-2 border-violet-500 shadow-3xl rounded-xl p-5">
      <h1 className="text-3xl font-semibold mb-auto">
        Student Academic Portal
      </h1>
      <Image src="/1061431.png" alt="student" width={150} height={130} className="mx-auto" />
      <div className="flex text-center font-bold rounded-xl bg-violet-600 shadow-3xl w-25 h-15 transition duration-300 ease-in  hover:-translate-y-1 hover:bg-violet-800 cursor-pointer mx-auto ">
          <Link href={"./login"} className="text-semibold text-white ">Start Tracking</Link>
      </div>
      </div>
      
    </main>
  )
}
