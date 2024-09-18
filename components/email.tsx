"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../app/page.module.css";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function EmailInput() {
    const [email, setEmail] = useState("");
    const pathname = usePathname();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
            />

            {pathname === "/sign-in" ? (
                <LoginLink
                    authUrlParams={{
                        connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
                        login_hint: email
                    }}
                    className={styles.button}
                >
                    Sign In
                </LoginLink>
            ) : pathname === "/sign-up" ? (
                <RegisterLink
                    authUrlParams={{
                        connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
                        login_hint: email
                    }}
                    className={styles.button}
                >
                    Register
                </RegisterLink>
            ) : null}
        </div>
    );
}
