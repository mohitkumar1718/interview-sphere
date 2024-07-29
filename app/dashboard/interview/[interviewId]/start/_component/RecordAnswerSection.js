"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

export const RecordAnswerSection = ({ interviewQuestions, activeQuestionIndex, setActiveQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const resultsRef = useRef([]);

  const {
    error,
    interimResult,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (!isRecording && results.length > 0) {
      const combinedResults = results.map(result => result.transcript).join(' ');
      resultsRef.current = combinedResults;
      setUserAnswer(combinedResults);
    }
  }, [results, isRecording]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setIsRecording(false);
    } else {
      startSpeechToText();
      setIsRecording(true);
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    try {
      const feedbackPrompt = `Question: ${interviewQuestions[activeQuestionIndex]?.question}, User Answer: ${resultsRef.current}. Based on the question and answer for the given interview question, please provide a rating for the answer and feedback in just 3 to 5 lines to improve it in JSON format with 'rating' and 'feedback' fields.`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        Question: interviewQuestions[activeQuestionIndex]?.question,
        correctAns: interviewQuestions[activeQuestionIndex]?.answer,
        userAns: resultsRef.current,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        UserEmail: user?.primaryEmailAddress.emailAddress,
        createdAt: moment().format('YYYY-MM-DD')
      });

      if (resp) {
        toast("User Answer Recorded Successfully");
      }
      setUserAnswer('');
      setResults([]);
      resultsRef.current = '';
    } catch (error) {
      toast("Error while saving your answer");
      console.error("Error updating user answer:", error);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black'>
        <Image src={'/webCam.jpg'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button onClick={StartStopRecording} variant="outline" className="my-10" disabled={loading}>
        {
          isRecording ?
            <h2 className='text-red-600 flex gap-2'>
              <Mic /> Stop Recording
            </h2> :
            "Record Answer"
        }
      </Button>
      {/* <Button onClick={() => console.log(userAnswer, userAnswer.length)}>Show user answer</Button> */}
    </div>
  );
}
