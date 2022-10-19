import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';
import GlobalStyle from './utils/style/GlobalStyle';
import { LoggedProvider } from './utils/context';
import { EditProvider } from './utils/context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <LoggedProvider>
                <EditProvider>
                    <GlobalStyle />
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route>
                            <Error />
                        </Route>
                    </Switch>
                    <Footer />
                </EditProvider>
            </LoggedProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
