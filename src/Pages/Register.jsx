import React from 'react';
import LoginBanner from '../Component/LoginBanner';
import { Formik, Form, ErrorMessage, Field  } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Component/Button';
import Logo from '../svg/Logo';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { signup } from '../Api/api';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, 'Password must be atleast 6  characters').required('Password is required'),
})

const Register = () => {

    const navigate = useNavigate();
    const initialValues = { name: "", email: "", password: ""};

    const handleSubmit = async(values, {resetForm}) => {
        try{
            console.log("Sending signup data:", values);
            const res = await signup(values);
            toast.success("Register Successfully!");
            console.log(res.data);
            resetForm();
            navigate('/signin');
            
        }catch(err){
            const errorMsg = err?.response?.data?.message;

            if(errorMsg && errorMsg.toLowerCase().includes("already exists")){
                toast.info("You're already registered. Please go to the login page.");
                setTimeout(() => navigate("/signin"), 2000);
            } else{
                toast.error("Registration failed. Please try again.");

            }
            console.error("Signup error:", errorMsg);
        }
    };
    
  return (
    <div className='w-full h-screen flex overflow-hidden justify-between items-center'>
        <div className='w-auto h-auto fixed top-[10px] left-[10px]'>
            <Logo/>
        </div>
        <div className='w-full h-auto flex flex-col items-center justify-center gap-[35px]'>
            <div className='w-full max-w-[350px] h-auto flex flex-col gap-[35px]'>
            <span className='text-big'>Get Started Now</span>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                <Form className='w-full h-auto flex flex-col gap-[10px]'>
                    <div className='w-full'>
                        <label htmlFor="name" className='text-base-md'>Name</label><br />
                        <Field name="name" type="text" className="border border-[#D9D9D9] w-full max-w-[350px] outline-none"/>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="email" className='text-base-md'>Email</label><br />
                        <Field name="email" type="email"  className="border border-[#D9D9D9] w-full max-w-[350px] outline-none"/>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="password" className='text-base-md'>Password</label><br />
                        <Field name="password" type="password"  className="border border-[#D9D9D9] w-full max-w-[350px] outline-none"/>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div className='w-full max-w-[350px] flex items-center justify-center mt-[30px]'>
                        <Button text="Signup" type="submit" className='w-auto bg-[#3A5B22] text-[#ffffff] items-center justify-center'/>
                    </div>
                </Form>
            </Formik>
        </div>
            <div className='w-full max-w-[350px] flex items-center justify-center my-4'>
                <div className="w-full h-px bg-gray-300"></div>
                    <span>Or</span>
                <div className="w-full h-px bg-gray-300"></div>
            </div>

            <div className='w-full max-w-[350px] justify-between gap-[10px] flex'>
                <Button icon={FcGoogle} text="Google" type='submit' className='bg-transparent border border-black flex items-center justify-center'/>
                <Button icon={AiFillApple} text="Apple" type='submit' className='bg-transparent border border-black flex items-center justify-center'/>
            </div>

            <div className=''>
                <span className=''>Have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> navigate('/signin')}>Sign in</span></span>
            </div>
        </div>
        <ToastContainer position="bottom-left"/>
        <div className='w-auto h-auto'>
            <LoginBanner/>
        </div>
    </div>
  )
}

export default Register;