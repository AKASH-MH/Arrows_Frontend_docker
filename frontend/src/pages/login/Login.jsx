import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import arrowLogo from "../../assets/login/arrow_logo.png";
import maskGroup from "../../assets/login/mask_group.png";
import loginCircle from "../../assets/login/login_circle.png";
import loginCircle2 from "../../assets/login/login_circle2.png";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = async () => {
    const emailValue = email.trim();
    if (!emailValue) {
      setEmailError('Email address is required');
      return;
    }
    setEmailError('Validating email...');
    // Simulate AJAX validation for email format
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(emailValue)) {
            resolve();
          } else {
            reject(new Error('Invalid email format'));
          }
        }, 500);
      });
      setEmailError('');
    } catch (err) {
      setEmailError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hasValidationError = false;

    if (!emailValue) {
      setEmailError('Email address is required');
      hasValidationError = true;
    } else if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email address');
      hasValidationError = true;
    } else {
      setEmailError('');
    }

    if (!passwordValue) {
      setPasswordError('Password is required');
      hasValidationError = true;
    } else {
      setPasswordError('');
    }

    if (hasValidationError) {
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate AJAX validation
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'admin@example.com' && password === 'admin') {
            resolve({ ok: true });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000); // Simulate network delay
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome Back <span className="sign-in">Sign In</span></h1>
        <p className="para-text1">Access Your Account</p>
        <p className="para-text2">Please enter your email and password to continue.<br></br>
If you've forgotten your password, use the "Forgot Password" option<br></br> to reset it. Make sure your login details are secure and up to date.</p>
        <img src={maskGroup} alt="Logo" className="login-logo" />
        <img src={loginCircle} alt="Login Circle" className="login-circle" />
        <img src={loginCircle2} alt="Login Circle 2" className="login-circle2" />
      </div>
      <div className="login-right">
        <div className="logo-wrapper">
        <img src={arrowLogo} alt="Arrow Logo" className="arrow-logo" />
        </div>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group email-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <MdOutlineEmail className="input-icon" size="20" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) {
                    setEmailError('');
                  }
                }}
                onBlur={validateEmail}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <TbLockPassword className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError('');
                  }
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
