import React, { useState } from 'react';
import { Mail, Chrome } from 'lucide-react';
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink 
} from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      };
      onLoginSuccess(user);
    } catch (err) {
      setError('Google login failed. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const actionCodeSettings = {
        url: window.location.origin, // This will use your deployed URL
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save the email locally to remember the user when they return
      window.localStorage.setItem('emailForSignIn', email);
      
      setOtpSent(true);
      setError('Check your email for the login link!');
    } catch (err) {
      console.error('Error details:', {
        code: err.code,
        message: err.message,
        fullError: err
      });
      setError(`Failed to send email link: ${err.message}`);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Check if the URL contains a sign-in link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get the email from localStorage
        let emailFromStorage = window.localStorage.getItem('emailForSignIn');
        
        if (!emailFromStorage) {
          emailFromStorage = email; // Use the current email if not in storage
        }

        // Sign in with the email link
        const result = await signInWithEmailLink(
          auth,
          emailFromStorage,
          window.location.href
        );

        // Clear email from storage
        window.localStorage.removeItem('emailForSignIn');

        const user = {
          id: result.user.uid,
          name: result.user.email.split('@')[0], // Using email prefix as name
          email: result.user.email
        };
        
        onLoginSuccess(user);
      } else {
        setError('Invalid login link. Please request a new one.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to sign in. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Welcome to Retro Arcade</h2>
      
      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 p-3 mb-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        <Chrome size={20} />
        Continue with Google
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">Or continue with Email</span>
        </div>
      </div>

      {otpSent ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-900/50 text-green-200 rounded">
            <p>A sign-in link has been sent to:</p>
            <p className="font-bold">{email}</p>
            <p className="mt-2">Please check your email and click the link to sign in.</p>
          </div>
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="w-full mt-2 p-2 text-gray-400 hover:text-white"
          >
            Use a different email
          </button>
        </div>
      ) : (
        /* Email Input Form */
        <form onSubmit={handleSendOTP}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            <Mail size={20} />
            Send Sign-in Link
          </button>
        </form>
      )}

      {error && (
        <div className={`mt-4 p-3 rounded text-sm ${
          error.includes('Check your email') 
            ? 'bg-green-900/50 text-green-200'
            : 'bg-red-900/50 text-red-200'
        }`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;