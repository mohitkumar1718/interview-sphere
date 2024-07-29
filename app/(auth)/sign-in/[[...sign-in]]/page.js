import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12 text-black">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://img.freepik.com/free-vector/gradient-ai-alignment-illustration_23-2151160382.jpg?size=626&ext=jpg&ga=GA1.1.1242246394.1721823802&semt=ais_user"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
          <img src="/logo2.png" alt="" className="h-12" />
        </a>

        <h2 className="mt-6 text-2xl font-bold text-black p-2 bg-blue-100 rounded-lg bg-opacity-55 sm:text-3xl md:text-4xl">
          Welcome to Interview Sphere
        </h2>

        <p className="mt-4 leading-relaxed text-black p-2 bg-blue-100 bg-opacity-55 rounded-lg">
          THIS IS A PLATFORM WHERE YOU CAN GIVE MOCK INTERVIEW AND GET FEEDBACK AND IMPROVE YOUR WEEK AREA FOR ACTUAL PLACEMENT INTERVIEW
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href="#"
          >
            <span className="sr-only">Home</span>
            <img src="/logo2.png" alt="" />
          </a>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to Interview Sphere
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
          THIS IS A PLATFORM WHERE YOU CAN GIVE MOCK INTERVIEW AND GET FEEDBACK AND IMPROVE YOUR WEEK AREA FOR ACTUAL PLACEMENT INTERVIEW
          </p>
        </div>

        <SignIn />
      </div>
    </main>
  </div>
</section>
  )
  
  
}