import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The details are: {props.info}</p>
    </div>
)

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth ? <Info {...props}/> : <p>Please log-in to continue</p>}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuth={false} info="These are the details"/>,document.getElementById('app'))