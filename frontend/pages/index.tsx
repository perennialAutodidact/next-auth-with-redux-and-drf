import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../common/components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Home</h1>
      </div>
    </Layout>
  );
};

export default Home;
