/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  
	const [interviewData, setInterviewData] = useState();
	const [webCamEnable, setWebCamEnable] = useState(false);
	useEffect(() => {
		console.log(params.interviewId);
		GetInterviewDetails();
	}, []);

	const GetInterviewDetails = async () => {
		const result = await db
			.select()
			.from(MockInterview)
			.where(eq(MockInterview.mockId, params.interviewId));
		console.log(result);
		setInterviewData(result[0]);
	};
	return (
		<div className='my-10 flex justify-center flex-col '>
			  <h1 className='font-bold  text-2xl'>Let's Get Started</h1>
			  <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col my-5 gap-4'>
            <div className="flex flex-col p-5 rounded-lg border gap-5">
				      <h2><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
				      <h2><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc}</h2>
				      <h2><strong>Years Of Experience: </strong>{interviewData?.jobExperience}</h2>
            </div>
            <div className="p-5 border border-yellow-300 bg-yellow-100 rounded-lg">
              <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb/><strong>Information</strong></h2>
              <h2 className="mt-3 text-yellow-600">{process.env.NEXT_PUBLIC_INFORMATION_NOTE}</h2>
            </div>
          <div>

        </div>
			</div>
				<div>
					{webCamEnable ? (
						<Webcam
							mirrored={true}
							onUserMedia={() => setWebCamEnable(true)}
							onUserMediaError={() => setWebCamEnable(false)}
							style={{
								height: 600,
								width: 600,
							}}
						/>
					) : (
						<>
							<WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
							<Button  className="w-full" onClick={() => setWebCamEnable(true)}>
								Enable WebCam and MicroPhone
							</Button>
						</>
					)}
				</div>
        

			</div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/"+params.interviewId+"/start"}>
          <Button className="bg-green-600" >Start Interview</Button>
        </Link>
      </div>

			
		</div>
	);
};

export default Interview;
