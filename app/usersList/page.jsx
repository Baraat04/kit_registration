"use client";

import styles from "./usersList.module.css";
import { useState, useEffect } from "react";
const page = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getAll() {
      try {
        const response = await fetch("api/getUsers", {
          method: "GET",
        });
        const data = await response.json();
        setUsers(data.users);
        console.log(data.users);
      } catch (e) {
        console.log(e);
      }
    }
    getAll();
  });

  return (
    <div className={styles.usersList_main}>
      <div className={styles.usersList_container}>
        {users.map((user, index) => (
          <div key={index} className={styles.userBox}>
            <div>Имя:{user.name},</div>
            <div>Email:{user.email},</div>
            <div>Фамилия:{user.surname}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
