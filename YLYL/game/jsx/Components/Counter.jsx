import React, { useState, useEffect } from 'react';

function Counter(props){
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${props.name} ${count} times`;
    });

    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count+1)}>
                Click here
            </button>
        </div>
    );
}

export default Counter;