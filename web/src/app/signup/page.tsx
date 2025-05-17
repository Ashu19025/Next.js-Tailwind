"use client";

import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";





export default function SignupPage() {
      const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
    <div className="flex flex-col items-center justify-center w-96 bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl  text-white">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>

      <input type="text" 
      id="username"
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      value={user.username}

      className="p-2 border border-black-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500" 
       placeholder="Enter your username"
       />
       <label htmlFor="email">email</label>
       <input type="email" 
       className="p-2 border border-black-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500" 
       placeholder="Enter your email"
       />
       <label htmlFor="password">password</label>
       <input type="password" 
       placeholder="Enter your password"
       className="p-2 border border-black-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
       />
       <Link href={"/login"}>For Login Click Here</Link>
    </div>
    </div>
  );
}