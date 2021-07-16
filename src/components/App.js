import React, { useState } from "react";
import AppRouter from "./Router";
import fbase from "../fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // props로 로그인상태를 <AppRouter>로 보내줘야한다
  return (
  <>
    <AppRouter isLoggedIn={ isLoggedIn } />
    <footer>@copy; {new Date().getFullYear()} Glitter By glen</footer>
  </>
  )
}

export default App;
