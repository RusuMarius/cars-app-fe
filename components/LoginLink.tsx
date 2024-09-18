import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import styles from '../app/page.module.css'
import { useState } from "react";

const LoginLinkComponent = () => {
  const [email, setEmail] = useState("");

  return (
    <LoginLink
        authUrlParams={{
            connection_id:
                process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
            login_hint: email
        }}
        className={styles.button}
    >
        NEXT
    </LoginLink>
  )
}

export default LoginLinkComponent