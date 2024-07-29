"use client"

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
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
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";


const AddNewInterview = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesc, jobRole, experience);

    const InputPrompt = 'Job Position: ' + jobRole + ', Job Description: ' + jobDesc + ' , Years of Experience : ' + experience +
      ' , Depends on this information please give me ' + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + ' interview question with answer in JSON format , Give question and answer as field in JSON';
    
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const JsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
      console.log(JsonResponse);
      setResponse(JsonResponse);
      
      if (JsonResponse) {
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResponse: JsonResponse,
            jobPosition: jobRole,
            jobDesc: jobDesc,
            jobExperience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format()
          }).returning({ mockId: MockInterview.mockId });
        
        console.log("inserted id :", resp);

        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error submitting interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className="font-bold text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell Us More About Your Job Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add more details about your job position/role, Job Description, and years of experience</h2>
                </div>
                <div className="my-3">
                  <label>Job Role/Job Position</label>
                  <Input placeholder="Ex. Full Stack developer" required onChange={(e) => setJobRole(e.target.value)} />
                </div>
                <div className="my-3">
                  <label>Job Description/Tech Stack</label>
                  <Textarea placeholder="Ex. React, Node Js etc" required onChange={(e) => setJobDesc(e.target.value)} />
                </div>
                <div className="my-3">
                  <label>Experience In Year</label>
                  <Input placeholder="Ex.5" type="number" min="0" max="20" required onChange={(e) => setExperience(e.target.value)} />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" /> Generating From AI</> : 'Start Interview'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
