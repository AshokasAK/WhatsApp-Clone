import React from "react";
import Login from "./components/Login";
import { useStateValue } from "./components/ContextApi/StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "./App.css";
// const apiUrll = import.meta.env.REACT_APP_API_URL;

const App = () => {
  const [{ user }] = useStateValue();
  const apiUrl = "http://localhost:8500/";

  return (
    <>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Router>
              <Sidebar apiUrl={apiUrl} />
              <Routes>
                <Route path={"/"} element={<Chat apiUrl={apiUrl} />} />
                <Route
                  path={"/rooms/:roomId"}
                  element={<Chat apiUrl={apiUrl} />}
                />
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
