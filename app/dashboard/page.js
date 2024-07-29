"use client"

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import AddNewInterview from "./_component/AddNewInterview";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import InterviewList from "./_component/InterviewList";

const Dashboard = () => {
  const [openDialog,setOpenDialog]=useState(false);
  const [jobDesc,setJobDesc]=useState("");
  const [jobRole, setJobRole]=useState("");
  const [experience,setExperience]=useState("");
  const [loading,setLoading]=useState(false);
  const [response,setResponse]=useState([]);
  const onSubmit=async(e)=>{
       setLoading(true);
       e.preventDefault();
      //  console.log(jobDesc,jobRole,experience);
       const InputPrompt='Job Position: '+ jobRole +', Job Description: '+jobDesc +' , Years of Experience : '+ experience +
       ' , Depends on this information please give me '+ process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +' interview question with answer in JSON formate , Give question and answer as field in JSON'
      
      const result= await chatSession.sendMessage(InputPrompt);
      const JosnResponse=(result.response.text()).replace('```json','').replace('```','');
      // console.log(JSON.parse(JosnResponse));
      setLoading(false);
  }
	return (
		<div className='p-10'>
			<h1 className='text-2xl font-bold'>Welcome to dashboard </h1>
			<h1 className='text-gray-500'>Create and Start your Ai Mock Interview</h1>
			<div className='grid grid-cols-1 md:grid-cols-3'>
				<AddNewInterview />
			</div>
      {/* previous interview */}
			<InterviewList/>
		</div>

	);
};

export default Dashboard;
