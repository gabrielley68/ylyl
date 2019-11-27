import React, { useEffect, useRef, useContext } from 'react';

const defaultOnHide = () => alert("onClose not implemented !!!");

const onHideContext = React.createContext(defaultOnHide);

export function Header(props){
    const onHide = useContext(onHideContext);

    return(
        <header className="modal-card-head">
            <p className="modal-card-title">{props.children}</p>
            {onHide &&
                <button className="delete" aria-label="close" onClick={() => onHide()}></button>
            }
        </header>
    );
};

export function Body(props){
    return(
        <section className="modal-card-body">
            {props.children}
        </section>
    );
};

export function Footer(props){
    return (
        <footer className="modal-card-foot">
            {props.children}
        </footer>
    );
};


function Modal(props){
    return (
        <onHideContext.Provider value={props.onHide}>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    {props.children}
                </div>
            </div>
        </onHideContext.Provider>
    );
}

export default Modal;