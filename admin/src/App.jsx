import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Admin from "./Pages/Admin/Admin";
import { keepTheme } from "./Components/Sidebar/Theme";

const App = () => {
  useEffect(() => {
    keepTheme();
  }, []);
  return (
    <div className="app">
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
