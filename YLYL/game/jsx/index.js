import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Components/Counter';

function Game(props){
    return <Counter name="Gabriel"/>;
}

const element = <Game/>;
ReactDOM.render(
    element,
    document.getElementById('react')
);