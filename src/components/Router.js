import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

//hooks component
const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ?
                    (
                        <>
                            <Route exact path="/">
                                <Home userObj={userObj}></Home>
                            </Route>
                            <Route exact path="/profile">
                                <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
                            </Route>
                            <Redirect from="*" to="/"></Redirect>
                        </>
                    ) : (
                        <>
                            <Route exact path="/">
                                <Auth></Auth>
                            </Route>
                            <Redirect from="*" to="/"></Redirect>
                        </>
                    )
                }
            </Switch>
        </Router>)
}

export default AppRouter