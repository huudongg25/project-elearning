import React from "react";
import "./defaultLayout.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
interface Props {
  child: JSX.Element;
}
const defaultLayout = (props: Props): JSX.Element => {
  return (
    <div className="defaultLayout">
      <div className="headerDefaultLayout">
        <Header />
      </div>
      <div className="son">{props.child}</div>
      <div className="footerDefaultLayout">
        <Footer />
      </div>
    </div>
  );
};

export default defaultLayout;
