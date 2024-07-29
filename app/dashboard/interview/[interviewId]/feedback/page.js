"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

const feedback = ({params}) => {
    const [feedback,setFeedback]=useState([])
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
      const result= await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef,params.interviewId))
      .orderBy(UserAnswer.id);
      setFeedback(result)
      console.log(result)
    }
  return (
    <div className='p-10'>
        {feedback?.length==0?
        <h2 className='font-bold text-gray-500 text-xl my-4'>No Feedback Is recorded for this interview </h2>
        :<><h2 className='text-3xl font-bold text-green-500'>Congratulation!!</h2>
        <h2 className='text-2xl font-bold'>Here is your Interview feedback</h2>
        <h2 className='text-primary text-lg mt-3'>You can see the feedback for individual question</h2>
        <h2 className='text-sm text-gray-500 mb-5'>Find below interview question with correct answer , Your Answer and feedback for improvement</h2>
       {feedback&& feedback.map((item,index)=>(
        <Collapsible key={index}>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-10 w-full'>
                {item.Question} <ChevronsUpDown className='h-4 w-8 my-auto'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-red-500 p-2 rounded-lg border'><strong>Rating: {item.rating}</strong></h2>
                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback </strong>{item.feedback}</h2>
                </div>
            </CollapsibleContent>
            </Collapsible>

       ))}
        </>}
        
       <Button onClick={()=>router.replace('/dashboard')} className="mt-5">Go Home</Button>
    </div>
  )
}

export default feedback