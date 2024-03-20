import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
