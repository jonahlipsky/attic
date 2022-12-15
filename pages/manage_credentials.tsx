import React from "react";
import styles from "../styles/Home.module.css";

import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const handleSubmit = (e: React.FormEvent): void => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    accessKeyId: { value: string };
    secretAccessKey: { value: string };
  };
  const accessKeyID = target.accessKeyId;
  const secretKey = target.secretAccessKey;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default function Upload() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Manage your credentials!</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Your Access Key ID
          <input type="text" id="access-key-id" name="accessKeyId"></input>
        </label>
        <label>
          Your Secret Access Key
          <input
            type="password"
            id="secret-access-key"
            name="secretAccessKey"
          ></input>
        </label>
        <input type="submit" value="submit"></input>
      </form>
    </main>
  );
}
