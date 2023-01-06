import React from "react";
import styles from "../../styles/Home.module.css";

import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { trpc } from "../utils/trpc";


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    accessKeyId: { value: string };
    secretAccessKey: { value: string };
  };
  const accessKeyID = target.accessKeyId;
  const secretKey = target.secretAccessKey;
  await fetch("/api/credentials", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      accessKey: accessKeyID.value,
      secretAccessKey: secretKey.value,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log('json');
    })
    .catch((err) => console.error(err));
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
