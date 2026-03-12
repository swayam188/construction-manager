import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../utils/mockData';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      navigate('/projects');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h2>Construction Login</h2>
        <input 
          type="email" placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} required 
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;