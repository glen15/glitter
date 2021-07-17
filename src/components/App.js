import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //currentUser 는 username또는 null 반환
  // props로 로그인상태를 <AppRouter>로 보내줘야한다
  return (
  <>
    <AppRouter isLoggedIn={ isLoggedIn } />
    <footer>@copy; {new Date().getFullYear()} Glitter By glen</footer>
  </>
  )
}

export default App;
