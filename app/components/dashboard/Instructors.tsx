import React from 'react'
import { Course } from '@/app/lib/api/courses'

interface Props {
    course: Course
  }
  
export default function Instructors({course}:Props) {
    return (
        <>
            
                <div className='w-50 h-20 rounded-xl bg-neutral-200 flex gap-2'>
                    <div className='w-15 h-15 rounded-full mt-2.5 ml-2 bg-violet-400 p-2 border-3 border-violet-700 flex'>
                        <div className='text-white font-bold text-shadow-2xl shadow-cyan p-1 text-center justify-center mt-1'>
                            {course.code.slice(0,3)}
                        </div>
                    </div>
                    <div  className='font-semibold text-black ml-auto p-5 mt-2'>
                        
                        {course.instructor}
                        
                        
                    </div>

                </div>
                

            
        </>
    )
}
