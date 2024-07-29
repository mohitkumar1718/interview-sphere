"use client"
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path=usePathname();
  return (
    <div className='hidden md:flex justify-between py-2 px-12 bg-secondary shadow-md'>
      <div className='flex'>
        <img src="/logo2.png" className='w-14' alt="" /><span className='my-auto font-bold mx-1 '>INTERVIEW SPHERE</span>
      </div>
        <ul className='flex gap-6 items-center'>
            <Link href={'/dashboard'}><li className={`hover:text-primary hover:font-bold ${path=='/dashboard' && 'text-primary font-bold'}`}>DashBoard</li></Link>
            <li className={`hover:text-primary hover:font-bold ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
            <Link href={'/upgrade'}><li className={`hover:text-primary hover:font-bold ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li></Link>
            <li className={`hover:text-primary hover:font-bold ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header