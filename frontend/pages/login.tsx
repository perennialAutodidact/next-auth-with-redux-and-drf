import { NextPage } from "next";
import formStyles from "../styles/authform.module.css";
import styles from "../styles/Home.module.css";
import Layout from "../common/components/Layout";
import React, {
  useState,
  FormEvent,
  FormEventHandler,
  ChangeEvent,
} from "react";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/authSlice/actions";
import { AuthFormData } from "../ts/interfaces/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

const LoginPage = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .then(unwrapResult)
      .then(res=>{
        console.log(res)
        // router.push('/')
      })
      .catch(err=>console.log(err))

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
            <input
              type="submit"
              value="Log In"
              className={formStyles.submitButton}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
