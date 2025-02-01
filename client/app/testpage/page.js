'use client'

import { auth } from '../firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function Example() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    onCaptchVerify();
  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal", // Change to 'normal' or 'compact' for visible reCAPTCHA
          callback: (response) => {
            setRecaptchaVerified(true);
          },
          "expired-callback": () => {
            setRecaptchaVerified(false);
          },
        },
        auth
      );

      window.recaptchaVerifier.render().catch((error) => {
        console.log("Recaptcha render error:", error);
      });
    }
  }

  function onSignup() {
    if (!recaptchaVerified) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setOtpSent(true);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to send OTP. Please try again.');
      });
  }

  function verify() {
    if (!verificationId) {
      setError('Invalid verification ID.');
      return;
    }

    const credential = PhoneAuthProvider.credential(verificationId, code);
    signInWithCredential(auth, credential)
      .then((result) => {
        console.log('User signed in successfully:', result.user);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to verify OTP. Please try again.');
      });
  }

  return (
    <>
      <div id="recaptcha-container" className="my-4"></div>

      {!otpSent ? (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(v) => setPhoneNumber(v.target.value)}
            placeholder="Enter phone number"
          />
          <button id="sign-in-button" onClick={onSignup}>
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={code}
            onChange={(v) => setCode(v.target.value)}
            placeholder="Enter verification code"
          />
          <button onClick={verify}>Verify</button>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </>
  );
}
