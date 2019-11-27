import React from 'react';
import { Router } from '@reach/router';
import Home from './Home';
import NotFound from './NotFound';
import Room from './Room';


function App(){
    return (
        <Router basepath="/game">
            <Home path="/" />
            <Room path="/room/:roomId"/>
            <NotFound default />
        </Router>
    )
}

export default App;