import React,{useRef,useState} from "react";
import { Link } from "react-router-dom";
import { styles } from "./SignupForm.styles";
import { useSignUpForm } from "../../hooks/useSignupForm";
import { EyeIcon,EyeOffIcon,SparkleIcon } from "../../pages/SignupPage/SignupPage.icons";

export const SignupForm:React.FC =()=>{

    const {
    formData,
    errors,
    localError,
    isLoading,
    agreedToTerms,
    setAgreedToTerms,
    handleChange,
    handleSubmit,
    }=useSignUpForm();

    const [showPassword,setShowPassword]=useState(false);
    const [passwordFocused,setPasswordFocused]=useState(false);
    const inputRef= useRef<HTMLInputElement>(null);
    const isTogglingRef=useRef(false);

    return(
        <div className={styles.container()}>
            {/* Heading */}
            <div className={styles.headingRow()}>
        <span className={styles.sparkle()}>
          <SparkleIcon />
        </span>
        <h2 className={styles.title()}>Sign Up</h2>
        </div>
        <p className={styles.subtitle()}>Start managing your finances today.</p>

        <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className={styles.formGroup()}>
                <label className={styles.label()}>Your Name:</label>
                <input type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input()}
                placeholder="Your Name"
                disabled={isLoading}
                autoComplete="name" />
                {errors.name && <p className={styles.fieldError()}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className={styles.formGroup()}>
          <label className={styles.label()}>Your E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input()}
            placeholder="Your E-mail"
            disabled={isLoading}
            autoComplete="email"
          />
          {errors.email && <p className={styles.fieldError()}>{errors.email}</p>}
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
              placeholder="At least 8 characters"
              disabled={isLoading}
              autoComplete="new-password"
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
                  setShowPassword(v => !v);
                  inputRef.current?.focus();
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
          {errors.password && <p className={styles.fieldError()}>{errors.password}</p>}
        </div>

        {/* Terms */}
            <div className={styles.termsRow()}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={e => setAgreedToTerms(e.target.checked)}
            className={styles.checkbox()}
            disabled={isLoading}
          />
          <label htmlFor="terms" className={styles.termsText()}>
            I agree to the{' '}
            <Link to="/terms" className={styles.termsLink()}>Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className={styles.termsLink()}>Privacy Policy</Link>
          </label>
        </div>
        {errors.terms && <p className={styles.fieldError()}>{errors.terms}</p>}

        {/* Global Error */}
        {localError && (
          <div className={styles.globalError()}>{localError}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton()}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
          {!isLoading && <span className={styles.submitArrow()}>→</span>}
        </button>

        {/* Login link */}
        <p className={styles.loginText()}>
          Have an account?
          <Link to="/login" className={styles.loginLink()}>
            Log in
          </Link>
        </p>
        </form>
        </div>
    )
}