import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user) {
        //firebase 에서 user 전체 가져오면 크니까 필요한 displayName 등 몇개만 가져와서 넣기
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null)
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // Profile에서 .updateProfile을 해주면 변경이 생길거고
    // 여기서 그걸 적용하면서 리랜더링 할거고 자동으로 업데이트 될거야
    // 새로고침안해도 말이야
    
    // !! 상태변경하는 함수를 보내서 내려줘서 밑에서 변경할걸 위에서 바뀌게 하는거지
  }
  return (
  <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={ Boolean(userObj) } userObj={ userObj } />: "Initializing..."}
    <footer>@copy; {new Date().getFullYear()} Glitter By glen</footer>
  </>
  )
}

export default App;
