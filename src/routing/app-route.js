import React from 'react';
import { Switch, Route,  Link } from 'react-router-dom';
import './app-route.css';
import Intro from '../features/intro/intro';
import Users from '../features/users/users';
import Files from '../features/files/files';
import Types from '../features/types/types';
import FileSearch from '../features/files/filesearch';

function AppRoute() {
    return (
        <>
            <nav>
                <Link to="/">Intro</Link>
                <Link to="/users">Users</Link>
                <Link to="/files">Files</Link>
                <Link to="/types">Types</Link>
                <Link to="/filesearch">File Search</Link>
            </nav>
            <Switch>
                <Route exact path="/" component={Intro} />
                <Route path="/users" component={Users} />
                <Route path="/files" component={Files} />
                <Route path="/types" component={Types} />
                <Route path="/filesearch" component={FileSearch} />
            </Switch>
        </>
    );
}

export default AppRoute;