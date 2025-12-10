"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");

    const { error } = await supabase.auth.verifyOtp({
      email: localStorage.getItem("email")!, // from signup/login step
      token: code,
      type: "email",
    });

    if (error) {
      alert("Invalid OTP");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-md w-[380px] text-center'>
        <h2 className='text-2xl font-semibold mb-2'>Verify OTP</h2>
        <p className='text-gray-500 mb-6'>
          Enter the 6-digit code we sent to your email.
        </p>

        <div className='flex justify-between mb-6'>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className='w-12 h-12 text-center text-xl border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 outline-none'
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          className='w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition'
        >
          Verify
        </button>
      </div>
    </div>
  );
}
