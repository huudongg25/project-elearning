import React from "react";
import "./home.css";
import Banner from "../banner/banner";
const Home = () => {
  return (
    <main className="home">
      <section className="home_container">
        <div className="home_banner">
          <Banner />
        </div>
      </section>
    </main>
  );
};

export default Home;
