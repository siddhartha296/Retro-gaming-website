import React, { useEffect, useState } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../firebase/config';

const EmailLinkHandler = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const signInWithEmail = async () => {
      try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = window.localStorage.getItem('emailForSignIn');
          
          if (!email) {
            // If email is missing from localStorage, prompt user
            email = window.prompt('Please provide your email for confirmation:');
          }

          if (email) {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            // Clear email from storage
            window.localStorage.removeItem('emailForSignIn');
            
            // Call onLoginSuccess with user data
            if (result.user) {
              onLoginSuccess({
                name: email.split('@')[0], // Use email username as display name
                email: email
              });
            }
          } else {
            setError('No email provided for sign in.');
          }
        }
      } catch (err) {
        console.error('Sign in error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    signInWithEmail();
  }, [onLoginSuccess]);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-gray-800 text-white p-4 rounded">
          Completing sign in...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-red-900/50 text-red-200 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return null;
};

export default EmailLinkHandler; 