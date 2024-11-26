import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../styles/PageLayout';
import Logo from '../../ui/Logo';
import PasswordInput from '../../ui/PasswordInput';
import { useSignup } from './useSignup';
import { useVerifyEmail } from './useVerifyEmail';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  });
  
  const [otp, setOtp] = useState('');
  
  // Using the signup hook
  const { signup, isSigningUp, showOtpInput } = useSignup();

  // Using the verify email hook
  const { verifyEmail, isVerifying } = useVerifyEmail();

  function handleSubmit(e) {
    e.preventDefault();
    
    // Check if it's OTP input stage
    if (showOtpInput) {
      verifyEmail({ email: formData.email, otp });
    } else {
      signup({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <PageLayout>
      <div className="flex flex-col w-[600px] mx-auto items-center bg-primary-50 p-8 rounded-lg shadow-md">
        <Logo />
        <h1 className="mt-4 text-4xl font-bold text-primary-900">
          CampusUnify
        </h1>
        <p className="mt-2 font-semibold text-primary-900">
          {showOtpInput ? 'Verify Your Email' : 'Create A New Account'}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4 w-full"
        >
          {!showOtpInput ? (
            <>
              <input
                type="text"
                placeholder="Name"
                id="name"
                required
                className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                required
                className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
                onChange={handleChange}
                value={formData.email}
              />
              <PasswordInput
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordInput
                id="passwordConfirm"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              <select
                id="role"
                className="border p-3 rounded-lg bg-white w-full text-primary-900"
                required
                onChange={handleChange}
                value={formData.role}
              >
                <option value="">Select...</option>
                <option value="club">Club</option>
                <option value="user">Student</option>
              </select>
            </>
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              id="otp"
              required
              className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          )}
          <button
            type="submit"
            disabled={isSigningUp || isVerifying}
            className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {showOtpInput ? 'Verify Email' : 'Sign Up'}
          </button>
        </form>
        <Link to="/login" className="mt-4 text-primary-900 underline text-sm">
          Already have an account?
        </Link>
      </div>
    </PageLayout>
  );
}
