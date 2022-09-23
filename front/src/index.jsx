import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Modify from './pages/Modify';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';
import GlobalStyle from './utils/style/GlobalStyle';
import { LoggedProvider } from './utils/context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <LoggedProvider>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/modify/:id">
                        <Modify />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route>
                        <Error />
                    </Route>
                </Switch>
                <Footer />
            </LoggedProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
