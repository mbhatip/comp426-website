import React, { useEffect, useState } from 'react'
import invert from 'invert-color'

import Table from './Table'
import demo from './demo';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import { FirebaseAuth } from "react-firebaseui";
import * as firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: 		process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 		process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: 		process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: 	process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: 	process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: 		process.env.REACT_APP_FIREBASE_APPID
});

function App() {
    const [user, setUser] = useState(null)
    const [domain, setDomain] = useState(null)
    const [s, setStatus] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [color, setColor] = useState("#FFFFFF")

    useEffect(() => {
        document.body.style.backgroundColor = color
        document.body.style.color = invert(color)
    }, [color])

    async function getStatus() {
        if (domain === "demo") {
            setStatus(demo)
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`https://eu.mc-api.net/v3/server/ping/${domain}`);
            const obj = await res.json()
            if (obj.online) {
                obj.domain = domain
                setStatus(obj)
            } else {
                setStatus(null)
            }
        } catch (error) {
            setStatus(null)
        }
        setLoading(false)
    }
    return <div className="container">
        <h1>Minecraft Server Status</h1>
		{!user && <div>
			<p>Sign in to save color theme: </p>
            <FirebaseAuth 
                uiConfig={{
                    signInFlow: 'popup',
                    signInOptions: [
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                        firebase.auth.GithubAuthProvider.PROVIDER_ID,
                        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
                    ],
                    callbacks: {
                        signInSuccessWithAuthResult: (authResult, redirectURL) => {
                            const user = authResult.user
                            setUser(user)
                            if (user.isAnonymous) return false
                            if (!/^#[a-fA-F0-9]{6}$/.test(user.photoURL)) {
                                user.updateProfile({
                                    photoURL: "#FFFFFF"
                                })
                                setColor("#FFFFFF")
                            } else {
                                setColor(user.photoURL)
                            }
                            return false
                        }
                    },
                    
                }}
                firebaseAuth={firebase.auth()} 
            />
		</div>}
        {user && <div>
            <input 
            onChange={event => setColor(event.target.value)}
            type="color"
            defaultValue={/^#[a-fA-F0-9]{6}$/.test(user.photoURL) ? user.photoURL : "#000000"}
            />  
            <h1>Logged in as {user.isAnonymous ? "Guest" : user.displayName}... 
                <button onClick={() => {
                    if (!user.isAnonymous) {
                        user.updateProfile({
                            photoURL: color
                        })
                    }
                    firebase.auth().signOut()
                    setUser(null)
                    setColor("#FFFFFF")
                }}>Logout?</button>
            </h1>
            <input 
                onKeyPress={(event) => {if(event.key === "Enter") getStatus()}}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="Enter domain here"
            />
            <button onClick={getStatus}>Get Status</button>
            <h1>Status: {isLoading ? "Loading..." : s ? "Online" : "Down"} </h1>
            {s && <div> 
                <h1>Domain: {s.domain}</h1>
                <h1>Favicon: <img src={s.favicon} alt="server favicon"/></h1>
                <h1>Version: {s.version.name}</h1> 
                <h1>Users: {s.players.online}/{s.players.max}</h1>
                <Table users={s.players.sample} />
            </div>}
        </div>}
    </div>
}

export default App
