'use client'
import { useState } from "react";
import styles from "../page.module.css";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import EmailInput from "@/components/email";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const AuthPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(event.target.value);
    };
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>Sign Up</h1>
                <div className={styles.authMethods}>
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={styles.input}
                />

                    {/* Use the client component for email input */}
                    <EmailInput />
                    <div className="flex items-center justify-center">
                      <LoginLink
                        className={styles.googleButton}
                        authUrlParams={{
                          connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || ""
                        }}
                      >
                        <FaGoogle className={styles.googleIcon} />

                      </LoginLink>
                      <LoginLink
                        className={styles.googleButton}
                        authUrlParams={{
                          connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_FACEBOOK || ""
                        }}
                      >
                        <FaFacebook className={styles.googleIcon} />

                      </LoginLink>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span>
                        Do you have an account?{" "}
                        <Link href="/sign-in"
                            className="btn btn-dark"

                        >
                            Log in
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;