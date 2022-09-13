import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../common/components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Home</h1>
        <Link href="/profile">
          <a href="">User Profile</a>
        </Link>
      </div>
     </Layout>
  );
};

export default Home;
