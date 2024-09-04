"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function loginPage() {

  const router=useRouter();

  const [user, setUser] = useState({
    email:"",
    password:""
  });

  const [buttonDissable, setButtonDissable] = useState(false);
 

  const [loading, setLoading] = useState(false);

  const onLogin=async()=>{
    try {

      setLoading(true);
      axios.post("/api/users/login",user);
      // toast.success('This is a success message!', {
      //   duration: 4000, // Optional: duration in milliseconds
      //   position: 'top-right', // Optional: position of the toast
      //   // Add other optional settings here
      // });
      router.push('/profile');

    } catch (error:any) {

      console.log("Login failed");
      toast.error(error.message);
    }
  }

  useEffect(()=>{
   if ( user.email.length>0 && user.password.length>0) {
    setButtonDissable(false)
   }else{
    setButtonDissable(true);
   }
  },[user])

  return (
    <div>
      <div className="main">
        <h1>{loading?"Processing":"Login"}</h1>
        <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-black text-center">Login</h2>
        <form  className="space-y-6">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email:e.target.value})}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 text-black focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({...user , password:e.target.value})}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 text-black focus:border-indigo-500 border-gray-300"
            />
          </div>
          <button
            type="submit"
            onClick={onLogin}
            className="w-full py-2 text-white bg-indigo-600 rounded-md  hover:bg-indigo-700"
          >            
            {buttonDissable?"No Signup":"Signup"}          
          </button>
          <Link className='flex justify-center text-cyan-500' href={'/signup'}> Visit signup page </Link>
        </form>
      </div>
    </div>
      </div>
    </div>
  )
}


