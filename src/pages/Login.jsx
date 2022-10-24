import React from 'react';

function Login() {
  return (
    <form>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="submit" data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
