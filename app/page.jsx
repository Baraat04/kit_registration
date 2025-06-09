"use client";

import styles from "./page.module.css";
import { useState } from "react";
export default function page() {
  const [isChoosen, setIsChoosen] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response) {
        throw Error("Some error occured");
      }
      const result = response.json();
      alert("Your credentials are submitter successfully");
      console.log(result);
    } catch (error) {
      alert("Provide credentials");
      console.log(error);
      return error;
    }
  };
  return isChoosen ? (
    <div className={styles.registration}>
      <div className={styles.registration_container}>
        <div className={styles.registration_box}>
          <div className={styles.header}>
            <h1 className={styles.title}>College of Information Technology</h1>
            <div className={styles.header_box}>
              <div className={styles.header_box_title}>
                Welcome to the College of Information Technology!
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.input_box}>
              <div className={styles.text}>Email</div>
              <input
                className={styles.input}
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <div className={styles.text}>Имя</div>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.input_box}>
              <div className={styles.text}>Фамилия</div>
              <input
                className={styles.input}
                name="surname"
                value={formData.surname}
                type="surname"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button onClick={handleSubmit} className={styles.btn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.language_box}></div>
  );
}
