import React from "react";
import styles from "../page.module.css";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import EmailInput from "@/components/email";
import Link from "next/link";

const AuthPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>Sign In</h1>
                <div className={styles.authMethods}>
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
                        Don&apos;t have an account?{" "}
                        <Link href='/sign-up'
                            className="btn btn-dark"

                        >
                            Create account
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;