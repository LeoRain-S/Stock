import React from "react";

export function SignInPage({ setIsAuthenticated }) {
  const handleSignIn = () => {
    // Perform authentication logic here
    // Set isAuthenticated to true if authentication is successful
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
