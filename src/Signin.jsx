import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function SignInPage() {
  // const [showSignInPage, setShowSignInPage] = useState(false);

  return (
    <div>
      <Popup trigger=
        {<button> Click to Log in </button>}
        modal nested>
        {
          close => (
            <div className='modal'>
              <div className='content' style={{ color: 'blue', textAlign: 'center'}}>
              <label className='signin-label'>Email:</label>
                <input type="text" />
              </div>
              <div className='content' style={{ color: 'blue', textAlign: 'center'}}>
              <label className='signin-label'>Password:</label>
                <input type="text" />
              </div>
              <div>
                <center>
                <button onClick=
                  {() => close()} >
                  Log In
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
