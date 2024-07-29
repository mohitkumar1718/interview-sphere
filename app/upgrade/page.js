import Link from 'next/link';
import React from 'react'

const upgrade = () => {
  return (
    <section>
    <div class="relative items-center w-full mx-auto md:px-12 lg:px-16 max-w-7xl">
      <div>
        <div class="relative p-10 space-y-12 overflow-hidden lg:space-y-0 flex items-center justify-center rounded-xl">
          <div class="relative flex flex-col p-8 bg-blue-600 rounded-2xl">
            <div class="relative flex-1">
              <h3 class="text-xl font-semibold text-white">GET STARTED</h3>
              <p class="flex items-baseline mt-4 text-white">
                <span class="text-5xl font-extrabold tracking-tight">$0</span>
                <span class="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p class="mt-6 text-white text-solitud">This is free of cost sign up and use it</p>
              {/* <!-- Feature list --> */}
              <ul role="list" class="pt-6 mt-6 space-y-6 border-t">
                <span class="text-lg font-semibold text-white">What's included?</span>
                <li class="flex">
                  <div class="inline-flex items-center w-6 h-6 bg-white rounded-xl">
                    <svg class="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-white">Add new interview</span>
                </li>
                <li class="flex">
                  <div class="inline-flex items-center w-6 h-6 bg-white rounded-xl">
                    <svg class="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-white">Record Your Answer</span>
                </li>
                <li class="flex">
                  <div class="inline-flex items-center w-6 h-6 bg-white rounded-xl">
                    <svg class="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-white">Get feedback for your improvement </span>
                </li>
                <li class="flex">
                  <div class="inline-flex items-center w-6 h-6 bg-white rounded-xl">
                    <svg class="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-white">You Can see your previous interview also</span>
                </li>
                <li class="flex">
                  <div class="inline-flex items-center w-6 h-6 bg-white rounded-xl">
                    <svg class="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-white">Free </span>
                </li>
              </ul>
            </div>
            <div class="z-50 mt-6 rounded-lg">
              <Link href="/dashboard" type="highlight" class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-white"> 
              Get started </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default upgrade;