import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validInfos, setValidInfos] = useState(false);

  const history = useHistory();

  const handleChange = ({ target: { id, value } }) => {
    if (id === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validLogin = () => {
      const MAX_NUM = 6;
      const pattern = email
        .toLowerCase()
        .match(
          /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i,
        );
      if (pattern && password.length > MAX_NUM) {
        setValidInfos(false);
      } else {
        setValidInfos(true);
      }
    };

    validLogin();
  }, [email, password]);

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        data-testid="email-input"
        id="email"
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        id="password"
        onChange={ handleChange }
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
