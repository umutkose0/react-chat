import React,{useState} from 'react';
import FeatherIcon from 'feather-icons-react';
import {signIn} from "./../firebase";
import {useNavigate,Link} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
function Login() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const submitHandle=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const email=e.target[0].value
    const password=e.target[1].value
    const res=await signIn(email,password);
   
    if(res)
    {
      navigate("/");
    }
    else
    {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="mt-3 rounded-md bg-white flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Toaster/>
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./default.png"
              alt="default user"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={submitHandle} className="mt-8 space-y-6" action="#" method="POST">
            
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="hidden" name="remember" defaultValue="true" />
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                  <Link to="/register">Register</Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FeatherIcon color="#3fe33f" icon="lock"  size="18"/>
                </span>
                {loading?"loading..":"Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login