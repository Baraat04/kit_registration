"use client";

import styles from "./admin.module.css";
import { Delete } from "lucide-react";
import { useState, useEffect } from "react";
const admin = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const password = "KIT321$";
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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/deleteUser/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const user = await response.json();
      if (!user) {
        console.log(user.message);
      }
      console.log(user.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submit = () => {
    if (inputValue === password) {
      setIsAdmin(true);
    } else {
      alert("Your password is not valid");
    }
  };
  return isAdmin ? (
    <div className={styles.usersList_main}>
      <div className={styles.title}>Admin Panel</div>
      <div className={styles.usersList_container}>
        {users.map((user, index) => (
          <div key={index} className={styles.userBox}>
            <div>
              <div>Имя:{user.name},</div>
              <div>Email:{user.email},</div>
              <div>Фамилия:{user.surname}</div>
            </div>
            <div>
              <Delete onClick={() => deleteUser(user.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.login_main}>
      <div className={styles.login_container}>
        <div className={styles.login_box}>
          <div className={styles.login_title}>Submit your password</div>
          <input
            value={inputValue}
            type="text"
            className={styles.input}
            placeholder="password"
            onChange={handleChange}
          />
          <button onClick={submit} className={styles.btn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default admin;
