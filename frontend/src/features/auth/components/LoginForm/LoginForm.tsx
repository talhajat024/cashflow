// features/auth/components/LoginForm/LoginForm.tsx
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from './LoginForm.styles';
import { useLoginForm } from '../../hooks/useLoginForm';
import { EyeIcon,EyeOffIcon } from '../../pages/LoginPage/LoginPage.icons';

export const LoginForm: React.FC = () => {
  
  const { formData, errors, localError, isLoading, handleChange, handleSubmit } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTogglingRef = useRef(false);

  return (
    <div className={styles.container()}>
      <h2 className={styles.title()}>Log In</h2>
      <p className={styles.subtitle()}>Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit} noValidate>

        <div className={styles.formGroup()}>
          <label className={styles.label()}>Email Address</label>
          <input
            type="email"
            name="email"                          
            value={formData.email}                
            onChange={handleChange}               
            className={styles.input()}
            placeholder="Random@gmail.com"
            disabled={isLoading}
            autoComplete="email"
          />
         
          {errors.email && (
            <p className={styles.fieldError()}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className={styles.formGroup()}>
          <label className={styles.label()}>Password</label>
          <div className={styles.passwordWrapper()}>
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              name="password"                     
              value={formData.password}           
              onChange={handleChange}             
              className={styles.input()}
              placeholder="Placeholder"
              disabled={isLoading}
              autoComplete="current-password"
              style={{ paddingRight: '2.5rem' }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => {
                if (!isTogglingRef.current) setPasswordFocused(false);
                isTogglingRef.current = false;
              }}
            />
            {passwordFocused && (
              <button
                type="button"
                className={styles.passwordToggle()}
                onMouseDown={() => { isTogglingRef.current = true; }}
                onClick={() => {
                  setShowPassword((v) => !v);
                  inputRef.current?.focus();
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
         
          {errors.password && (
            <p className={styles.fieldError()}>{errors.password}</p>
          )}
        </div>

        
        <div className={styles.checkboxRow()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              className={styles.checkbox()}
              disabled={isLoading}
            />
            <span className={styles.checkboxText()}>Remember information</span>
          </label>
          <Link to="/forgot-password" className={styles.forgotLink()}>
            Forgot password?
          </Link>
        </div>

        {localError && (
          <div className={styles.errorMessage()}>{localError}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={styles.loginButton()}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Signup */}
        <p className={styles.signupText()}>
          Don't have an account?
          <Link to="/signup" className={styles.signupLink()}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};