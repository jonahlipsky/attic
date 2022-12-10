import React from "react";
import styles from "../styles/Home.module.css";

const handleSubmit = (e: React.FormEvent): void => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    accessKeyId: { value: string };
    secretAccessKey: { value: string };
  };
  console.log(target);
};

export default function Upload() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Manage your credentials!</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" id="access-key-id" name="accessKeyId"></input>
        <input
          type="password"
          id="secret-access-key"
          name="secretAccessKey"
        ></input>
        <input type="submit"></input>
      </form>
    </main>
  );
}
