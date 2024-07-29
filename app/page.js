import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_component/Header";
import { ArrowBigRight, ArrowRight,  } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-[url('/background2.svg')] bg-cover h-screen text-center">
    <Header/>
    <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-extrabold mt-20">Your Personal AI Interview Mock Coach </h1>
    <h2 className="text-bold text-gray-500 text-base md:text-lg lg:text-xl text-center my-10">Double Your Chance of landing that job offer with our Ai Powered Mock Interview </h2>
    <Link href={'/dashboard'}>
    <Button className='p-5' >Get Started <ArrowRight/></Button>
    </Link>
    <h2 className="text-bold text-gray-500 text-xl text-center my-10">Featured In </h2>
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-extrabold text-centre">How it Works?</h2>
      <h2 className="text-base text-gray-500 text-center">Give Mock Interview In Just 3 easy steps</h2>
    </div>
    <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          <Card>
        <CardHeader>
          <CardTitle >Step 1</CardTitle>  
        </CardHeader>
        <CardDescription> Go to DashBoard/ Get Started</CardDescription>
        <CardContent>
          <p>Tap on Add New Interview And fill Details</p>
        </CardContent>
        
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step 2</CardTitle>  
        </CardHeader>
        <CardDescription> Start the interview after generating Questions</CardDescription>
        <CardContent>
          <p>Speak loud and properly to record your answer </p>
        </CardContent>
        
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Step 3</CardTitle>  
        </CardHeader>
        <CardDescription>Submit the Mock Interview  </CardDescription>
        <CardContent>
          <p>Get Your Feedback for Mock Interview and mistakes</p>
        </CardContent>
        
      </Card>

    </div>
    </div>
  );
}
