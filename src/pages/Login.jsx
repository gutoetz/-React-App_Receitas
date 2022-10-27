import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validInfos, setValidInfos] = useState(false);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validLogin = () => {
      const MAX_NUM = 6;
      const isValidEmail = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i).test(email);

      setValidInfos(!(isValidEmail && password.length > MAX_NUM));
    };

    validLogin();
  }, [email, password]);

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        data-testid="email-input"
        id="email"
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        type="password"
        data-testid="password-input"
        id="password"
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ validInfos }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
