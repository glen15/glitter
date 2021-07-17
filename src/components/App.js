import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //currentUser 는 username또는 null 반환
  // props로 로그인상태를 <AppRouter>로 보내줘야한다

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
  <>
    {init ? <AppRouter isLoggedIn={ isLoggedIn } />: "Initializing..."}
    <footer>@copy; {new Date().getFullYear()} Glitter By glen</footer>
  </>
  )
}

export default App;
