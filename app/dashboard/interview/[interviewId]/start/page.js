"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Questions from './_component/Questions';
import { RecordAnswerSection } from './_component/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const startInterview = ({params}) => {
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestions, setInterviewInterviewQuestions] = useState();
	
	useEffect(() => {
		// console.log(params.interviewId);
		GetInterviewDetails();
	}, []);

	const GetInterviewDetails = async () => {
		const result = await db
			.select()
			.from(MockInterview)
			.where(eq(MockInterview.mockId, params.interviewId));
		// console.log(result);
    const jsonMockResponse=JSON.parse(result[0]?.jsonMockResponse)
    setInterviewInterviewQuestions(jsonMockResponse);
		setInterviewData(result[0]);
    // console.log(jsonMockResponse);
	};
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/* questions */}
      <Questions interviewQuestions={interviewQuestions} 
      activeQuestionIndex={activeQuestionIndex} 
      setActiveQuestionIndex={setActiveQuestionIndex}/>

      {/* video /audio recording */}
      <RecordAnswerSection
      interviewQuestions={interviewQuestions} 
      activeQuestionIndex={activeQuestionIndex} 
      setActiveQuestionIndex={setActiveQuestionIndex}
      interviewData={interviewData}
      />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous</Button>}
        {activeQuestionIndex!=interviewQuestions?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next</Button>}
        {activeQuestionIndex==interviewQuestions?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>

        <Button>End Interview</Button>
        </Link>
        }
      </div>
    </div>
  )
}

export default startInterview