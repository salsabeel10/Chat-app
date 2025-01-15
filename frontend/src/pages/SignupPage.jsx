import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const {signUp,isSigningUp} = useAuthStore()

  const validateForm =()=>{}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className="w-full max-w-md space-y-8">

      </div>

    </div>
  )
}

export default SignupPage