"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

const InterviewList = () => {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([])
    useEffect(()=>{
        user && GetInterviewList();
    },[user])
    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where((eq(user?.primaryEmailAddress.emailAddress,MockInterview.createdBy)))
        .orderBy(desc(MockInterview.id));
        console.log(result);
        setInterviewList(result);
        console.log(interviewList);

    }
  return (
    <div className='mt-10'>
    <h2 className='font-bold text-xl lg:text-2xl'>Previous Mock InterviewList </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList && interviewList.map((interview,index)=>(
              
            <InterviewItemCard interview={interview} key={index} />
            
        ))}
       
    </div>
    </div>
  )
}

export default InterviewList