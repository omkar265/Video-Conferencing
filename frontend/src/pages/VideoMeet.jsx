import React, { useEffect } from 'react'
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

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({video: true});

            if(videoPermission) {
                setVideoAvailable(true);
            } else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({video: true});

            if(audioPermission) {
                setAudioAvailable(true);
            } else {
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true)
            } else {
                setScreenAvailable(false);
            }
        } 
            if(videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable, audio: audioAvailable});

                if(userMediaStream) {
                    window.localStream = userMediaStream;
                    if(localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
        catch (err){
            console.log(err);
        } 
    }

    useEffect(() => {
        getPermissions();
  }, [])

  let getUserMediaSuccess = (stream) => {

  }

  let getUserMedia = () => {
    if((video && videoAvailable) || (audio && audioAvailable)) {
        navigator.mediaDevices.getUserMedia({video: video, audio: audio})
        .then(getUserMediaSuccess) //TODO: getUserMedaiSucess
        .then((stream)=> {})
        .catch((e)=>console.log(e))
    } else {
        try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop())
        } catch (e) {}
    }
  }


  useEffect(() => {
    if(video !== undefined  && audio !== undefined) {
        getUserMedia();
    }
  }, [audio, video])

  let getMedia = () => {
    setVideo(videoAvailable);
    setVideo(audioAvailable);
    connectToSocketServer();
  }

  let connect = () => {
    setAskForusername(false);
    getMedia();
  }

    return (
        <div>
            {askForUsername === true ? 
            <div>
                
               <h2>Enter into Lobby</h2>
               <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}variant="outlined" />
                <Button variant="contained" onClick={connect}>Connect</Button>

                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>

               
            </div> : <></>} 
            
        </div>
  )
}
