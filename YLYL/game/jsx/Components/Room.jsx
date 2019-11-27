import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const MIN_CONFIDENCE = 0.05;

function Room(props){
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("Loading...");
    const faceDetector = faceapi.nets.tinyFaceDetector;

    useEffect(() => {
        const video = document.getElementById('inputVideo');
        setStatus("Loading models...");
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/static/models/tiny-face-detector'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/static/models/landmark'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/static/models/face-recognition'),
            faceapi.nets.faceExpressionNet.loadFromUri('/static/models/expression')
        ]).then(startVideo);

        function startVideo(){
            setStatus("Calculating...");
            navigator.getUserMedia(
                {video : {}},
                stream => (video.srcObject = stream),
                err => console.error(err)
            );
        }

        video.addEventListener("play", () => {
            setInterval(async () => {
                const detection = await faceapi
                    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();

                const expr = detection instanceof faceapi.FaceExpressions ? detection : faceapi.isWithFaceExpressions(detection) ? detection.expressions : undefined;

                if(!expr){
                    console.error("Error");
                    return;
                }

                const sorted = expr.asSortedArray();
                setStatus(sorted[0].expression);
            }, 100);
        });
    }, []);



    return (
        <div>
            <h3 className="title">{`Room ${props.roomId}`}</h3>
            {loading &&
            <div className={"loader-wrapper " + loading ? "is-active" : ""}>
                <div className="loader is-loading"></div>
            </div>
            }
            <h5>
                <span id="status">{status}</span>
            </h5>
            <div>
                <video id="inputVideo" muted autoPlay></video>
            </div>
        </div>
    );
}

export default Room;