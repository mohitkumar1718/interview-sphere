"use client";

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
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

    const inputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDesc}, Years of Experience: ${experience}. Please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Include "question" and "answer" as fields in the JSON.`;

    try {
      // Initialize the Generative AI model
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Start a chat session
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });

      // Send the prompt to the chat model
      const result = await chatSession.sendMessage(inputPrompt);
      const rawResponse = result.response.text();

      // Strip extra markers and clean the response
      const cleanResponse = rawResponse
        .replace(/^```json\s*/, "") // Remove opening "```json"
        .replace("```", ""); // Remove closing "```"

      console.log("Cleaned Response:", cleanResponse);

      // Parse the JSON
      const parsedResponse = JSON.parse(cleanResponse);
      console.log("Parsed JSON:", parsedResponse);
      setResponse(parsedResponse);

      if (parsedResponse) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResponse: JSON.stringify(parsedResponse), // Store the JSON as a string in DB
            jobPosition: jobRole,
            jobDesc: jobDesc,
            jobExperience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format(),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      } else {
        console.error("Empty response from the AI model.");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add more details about your job position/role, Job
                    Description, and years of experience
                  </h2>
                </div>
                <div className="my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack developer"
                    required
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/Tech Stack</label>
                  <Textarea
                    placeholder="Ex. React, Node Js etc"
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Experience In Year</label>
                  <Input
                    placeholder="Ex.5"
                    type="number"
                    min="0"
                    max="20"
                    required
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating From
                        AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
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
