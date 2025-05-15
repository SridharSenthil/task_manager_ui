import React from 'react';
import LoginBanner from '../svg/LoginBannerSvg';
import Logo from '../svg/Logo';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Component/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { signin } from '../Api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, 'Password must be atleast 6  characters').required('Password is required'),
});

const Login = () => {

  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const handleSubmit = async(values, {resetForm}) => {
    try{
      const res = await signin(values);
      localStorage.setItem('authToken', res.data.token);
      toast.success("Signed in successfully!");
      resetForm();
    }catch(err){
      console.error(err);
      toast.failure("Login Failed!");
    }
  };

  return (
    <div className='w-full h-screen flex overflow-hidden justify-between items-center'>
        <div className='w-auto h-auto fixed top-[10px] left-[10px]'>
            <Logo/>
        </div>
        <div className='w-full h-auto flex flex-col items-center justify-center gap-[35px]'>
          <div className='w-full max-w-[350px] h-auto flex flex-col gap-[35px]'>
            <div>
            <span className='text-big'>Welcome back!</span><br />
            <span className='text-base-md'>Enter your credential to access your account</span>
            </div>
          <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                  <Form className='w-full h-auto flex flex-col gap-[10px]'>
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
                        <Button text="Login" type='submit' className='w-auto bg-[#3A5B22] items-center text-[#ffffff] justify-center'/>
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
                <Button icon={FcGoogle} type="submit" text="Google" className='bg-transparent border border-black flex items-center justify-center'/>
                <Button icon={AiFillApple} text="Apple" type="submit" className='bg-transparent  border border-black flex items-center justify-center'/>
            </div>

            <div className=''>
                <span className=''>Don't Have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> navigate('/')}>Sign Up</span></span>
            </div>
        </div>
        <div className='w-auto h-auto'>
            <LoginBanner/>
        </div>
      </div>
  )
}

export default Login