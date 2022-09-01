import { NextPage } from "next";
import formStyles from "../styles/authform.module.css";
import styles from "../styles/Home.module.css";
import React, { useState, FormEventHandler, ChangeEvent } from "react";
import Layout from "../common/components/Layout";
import { register } from "../store/authSlice/actions";
import { useAppDispatch } from "../store/hooks";
import { AppThunk } from "../store/store";
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(register(formData))
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
        <h1>Register</h1>
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
          <label htmlFor="password2">
            <h3 className={formStyles.formLabel}>Confirm Password</h3>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={formStyles.formInput}
            />
          </label>
          <div className={formStyles.formInput}>
            <input
              type="submit"
              value="Register"
              className={formStyles.submitButton}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
