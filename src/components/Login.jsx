import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import appwriteService from "../appwrite/config"
import { getPostData } from '../store/postSlice'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register:register1, handleSubmit:handleSubmit1} = useForm()
    const {register:register2, handleSubmit:handleSubmit2} = useForm()
    const {register:register3, handleSubmit:handleSubmit3} = useForm()
    const [error, setError] = useState("")
    //const [input,setInput] = useState("")
    const [userID, setUserID] = useState("")
    const [secretCode,setSecretCode] = useState("")
   
  
    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData));
                    
                        appwriteService.getPosts().then((posts) => {
                            if (posts) {
                                posts.documents.forEach(post => {
                                    dispatch(getPostData(post));
                                });
                            }
                        });
                }
                
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    const sendingOtp = async(data) => {
        console.log("sending otp",data);
        setError("")
       
        try {
            
            const userId = await authService.createOTPlogin(data)
            if(userId){
                console.log("is in userId");
               setUserID(userId);
              
            }
        } catch (error) {
            setError(error.message)
        }
    }
    const otpLogin = async(data) => {
       
        setError("")
        try {
           
            const session = await authService.OTPlogin({userID,...data});

            if (session) {
                
                const userData = await authService.getCurrentUser()
                if(userData) {dispatch(authLogin(userData));
                    appwriteService.getPosts().then((posts) => {
                        if (posts) {
                            posts.documents.forEach(post => {
                                dispatch(getPostData(post));
                            });
                        }
                    });
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit1(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register1("email", {
                    required: false,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register1("password", {
                    required: false,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-1 border border-black/10`}>
        <div className="mt-3 flex justify-center">
                    <span className="inline-block w-full font-bold max-w-[100px]">
                       Guest Login
                    </span>
        </div>
        </div>
       {!userID && ( <form onSubmit={handleSubmit2(sendingOtp)} className='mt-1'>
            <div className='space-y-5'>
            <Input
                label="Phone number: "
                type="tel"
                placeholder="Enter your phone number"
                {...register2("phone_number", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Send Otp</Button>
            </div>
        </form>)}
      { userID && ( <form  onSubmit={handleSubmit3(otpLogin)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="OTP: "
                type="number"
                placeholder="Enter OTP"
                {...register3("otp", {
                    required: false,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>)}
                
        {/* <input 
                label="phone no"
                type="tel" 
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                />
                <button onClick={sendingOtp}>
                    send otp
                </button>
                <input 
                label="Otp"
                type="number" 
                value={secretCode}
                onChange={(e)=> setSecretCode(e.target.value)}
                />
                <button onClick={otpLogin}>
                    Login
                </button> */}
        </div>
    </div>
  )
}

export default Login