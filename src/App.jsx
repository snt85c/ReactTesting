import "./App.css";
import Login from "./LoginComponents/Login";
import AppSimple from "./AppTest/AppSimple";
import Navbar from "./NavbarComponents/Navbar";
import { useState } from "react";
import Counter from "./CounterComponents/Counter";
import TODO from "./TODOComponents/TODO";

export default function App() {
  const [user, setUser] = useState({});

  return (
    <>
      {/* <Navbar name={user.name} /> */}
      {/* <AppSimple /> */}
      <TODO />
      {/* <Login  setUser={setUser} user={user} /> */}
      {/* <Counter /> */}
    </>
  );
}
