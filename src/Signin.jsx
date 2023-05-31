import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
    } else {
      setError('');
      // Perform login logic
      closePopup();
    }
  };

  const handleSignup = () => {
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
    } else {
      setError('');
      // Perform signup logic
      closePopup();
    }
  };

  const closePopup = () => {
    setEmail('');
    setPassword('');
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';

    const popup = document.querySelector('.popup-overlay');
    if (popup) {
      popup.click();
    }
  };

  return (
    <div>
      <Popup trigger=
        {<button> Click to Log in </button>}
        modal nested>
        { close => (
            <div className='modal'>
              <div className='content' style={{ color: 'blue', textAlign: 'center'}}>
                <label className='signin-label'>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  ref={emailInputRef}
                />
              </div>
              <div className='content' style={{ color: 'blue', textAlign: 'center'}}>
                <label className='signin-label'>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  ref={passwordInputRef}
                />
              </div>
              {error && <div className='error-message'>{error}</div>}
              <div>
                <center>
                  <button onClick={handleLogin}>
                    Log In
                  </button>
                </center>
                <center>
                  <button onClick={handleSignup}>
                    Sign Up
                  </button>
                </center>
              </div>
            </div>
          )
        }
      </Popup>
    </div>
  );
}
