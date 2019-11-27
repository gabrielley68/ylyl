import React, { useState } from "react";
import { navigate } from "@reach/router";

import Modal, * as ModalChildren from "../Widgets/Modal";
import { getPath } from "../utils";

function Home(){
    const [roomId, setRoomId] = useState("");
    const [newRoomId, setNewRoomId] = useState("");
    const [showModal, setShowModal] = useState(false);

    function join(){
        console.log("join " + roomId);
        navigate(getPath(`room/${roomId}`));
    }

    function create(){
        console.log("created " + newRoomId);
        navigate(getPath(`room/${newRoomId}`));
    }

    return (
        <div>
            <div className="buttons is-centered">
            <button className="button is-large is-primary" onClick={() => setShowModal(true)}>Create a room</button>
            </div>
            <hr/>
            <div className="field">
                <label className="label is-medium">Room ID</label>
                <div className="control has-icons-left">
                    <input
                        className="input is-medium" type="text"
                        value={roomId} onChange={ev => setRoomId(ev.target.value)}
                        autoFocus
                    />
                    <span className="icon is-medium is-left">
                        <i className="fas fa-hashtag"></i>
                    </span>
                </div>
            </div>
            <button className="button is-medium is-primary" onClick={() => join()}>Join a room</button>

            {showModal &&
                <Modal onHide={() => setShowModal(false)}>
                    <ModalChildren.Header>Create a room</ModalChildren.Header>
                    <ModalChildren.Body>
                        <label className="label">Room ID</label>
                        <div className="control has-icons-left">
                            <input
                                className="input" type="text" value={newRoomId}
                                onChange={ev => setNewRoomId(ev.target.value)}
                                autoFocus
                            />
                            <span className="icon is-medium is-left">
                                <i className="fas fa-hashtag"></i>
                            </span>
                        </div>
                    </ModalChildren.Body>
                    <ModalChildren.Footer>
                        <div className="buttons is-right">
                            <button className="button is-light" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="button is-primary" onClick={() => create()}>Create</button>
                        </div>
                    </ModalChildren.Footer>
                </Modal>
            }
        </div>
    )
}

export default Home;