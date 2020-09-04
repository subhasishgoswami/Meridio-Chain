import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

 const Home = () => {
  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
};

export default Home;