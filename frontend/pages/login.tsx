import { NextPage } from "next";
import formStyles from "../styles/authform.module.css";
import styles from "../styles/Home.module.css";
import Layout from '../common/components/Layout'
import React, {
  useState,
  FormEvent,
  FormEventHandler,
  ChangeEvent,
} from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("Login Clicked");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className={formStyles.form}>
          <label htmlFor="email" className={formStyles.formInputGroup}>
            <h3 className={formStyles.formLabel}>Email</h3>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formStyles.formInput}
            />
          </label>

          <label htmlFor="password">
            <h3 className={formStyles.formLabel}>Password</h3>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formStyles.formInput}
            />
          </label>
          <div className={formStyles.formInput}>
            <input type="submit" value="Log In" className={formStyles.submitButton}/>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
