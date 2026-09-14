"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { clearAuthError, loginAdmin } from "../../store/features/authSlice";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAuthError());

    const result = await dispatch(
      loginAdmin({
        email: email.trim(),
        password,
      })
    );

    if (loginAdmin.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.introduction}>
        <div className={styles.overlay} />

        <div className={styles.brandContent}>
          <div className={styles.brand}>
            <Image
              src="/images/safari-logo-transparent.png"
              alt="Safari Travel elephant logo"
              width={664}
              height={683}
              sizes="64px"
              className={styles.brandLogo}
            />

            <div>
              <h1>Serendib Wild Trails</h1>
              <p>Safari & Experiences</p>
            </div>
          </div>

          <div className={styles.welcome}>
            <span className={styles.label}>ADMINISTRATION PORTAL</span>

            <h2>
              Manage every journey
              <br />
              from one place.
            </h2>

            <p>
              Securely review customer safari requests and manage bookings.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.loginSection}>
        <div className={styles.loginCard}>
          <div className={styles.heading}>
            <Image
              src="/images/safari-logo-transparent.png"
              alt="Safari Travel elephant logo"
              width={664}
              height={683}
              sizes="64px"
              className={styles.mobileLogo}
            />
            <p>SECURE ADMIN ACCESS</p>
            <h2>Welcome back</h2>
            <span>Enter your administrator credentials to continue.</span>
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) dispatch(clearAuthError());
                }}
                placeholder="admin@serendib.local"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>

              <div className={styles.passwordField}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) dispatch(clearAuthError());
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className={styles.showButton}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in to dashboard"}
            </button>
          </form>

          <p className={styles.securityNote}>
            🔒 Protected administrator access
          </p>
        </div>
      </section>
    </main>
  );
}
