import { signOut, useSession } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Attic() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status == "unauthenticated") {
    router.push("/");
    return;
  }

  return (
    <main className={styles.main}>
      {status == "loading" && <h1 className={styles.title}>Loading...</h1>}
      {status == "authenticated" && (
        <>
          <header className={styles.header}>
            <button className={styles.description} onClick={() => signOut()}>
              Sign out
            </button>
          </header>
          <h1 className={styles.title}>Let's start uploading files!</h1>

          <Link className={styles.description} href="/manage_credentials">
            Manage Credentials
          </Link>

          <Link className={styles.description} href="/files/upload">
            Upload Files
          </Link>

          <Link className={styles.description} href="/files/list">
            File List
          </Link>

          <p className={styles.description}>Please upload a file.</p>
        </>
      )}
    </main>
  );
}
