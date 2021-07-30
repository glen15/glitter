import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter =  ({ refreshUser, isLoggedIn, userObj }) => { //App.js의 return으로 가져온 props
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />} 
            {/*  && : <Navigation/>이 존재하려면 isLoggedIn이 true여야한다 는 의미 */}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj}/> {/* 로그인되어있으면 이쪽으로 */}
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/> 
                    </Route>
                </>
             ) : (
                <>
                    <Route exact path="/">
                        <Auth /> {/* 로그인안되어있으면 이쪽으로*/}
                    </Route>
                </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;