import { Button, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-start gap-8'>
        {/* Left Section */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-5xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Blog
            </span>{' '}
            Nest
          </Link>
          <p className='text-sm mt-5 text-gray-600 dark:text-gray-300'>
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className='flex-1 mt-8 md:mt-0'>
          <form className='flex flex-col gap-6'>
            <div>
              <p className='text-sm font-medium mb-2'>Your username</p>
              <TextInput id='username' type='text' placeholder='Username' required />
            </div>
            <div>
              <p className='text-sm font-medium mb-2'>Your email</p>
              <TextInput id='email' type='email' placeholder='name@company.com' required />
            </div>
            <div>
              <p className='text-sm font-medium mb-2'>Your password</p>
              <TextInput id='password' type='password' placeholder='Password' required />
            </div>
            <Button type='submit' gradientDuoTone='purpleToPink' className='w-full'>
              Sign Up
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500 hover:underline'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
