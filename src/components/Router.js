import React from "react";
import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

//hooks component
const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (<Router>
        <Switch>
            {isLoggedIn ?
                (
                    <>
                        <Route>
                            <Home></Home>
                        </Route>
                    </>
                ) : (
                    <Route>
                        <Auth></Auth>
                    </Route>
                )
            }
        </Switch>
    </Router>)
}

export default AppRouter