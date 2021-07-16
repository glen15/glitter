import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter =  ({ isLoggedIn }) => { //App.js의 return으로 가져온 props
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home /> {/* 로그인되어있으면 이쪽으로 */}
                    </Route>
                </>
            ) : (
                <Route exact path="/">
                    <Auth /> {/* 로그인안되어있으면 이쪽으로*/}
                </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;