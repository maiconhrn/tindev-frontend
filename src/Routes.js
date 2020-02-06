import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/pages/Login/Login';
import Main from './components/pages/Main/Main';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    );
}