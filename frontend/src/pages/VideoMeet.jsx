import React from 'react'
import { useRef,useState } from 'react';

import "../styles/videoComponent.css"

const server_url = "https://localhost:8080";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        {"urls" : "stan:stan.l.google.com:19302"}
    ]
}

export default function VideoMeetComponent() {
    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModel, setModel] = useState();

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, setMessage] = useState("");

    let [newMessage, setNewMessages] = useState(0);

    let [askForUsername, setAskForusername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useref([]);

    let [videos, setVideos] = useState([]);

    // TODO
    // if(isChrome() === false) {

    // }

    return (
        <div>
            
        </div>
  )
}
