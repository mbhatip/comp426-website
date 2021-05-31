import React, { useEffect, useState } from 'react'
import Table from './Table'
//import Form from './Form'

const MC_DOMAIN = "memohat.xyz"

function App() {
    const [status, setStatus] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        async function getStatus() {
            try {
                const res = await fetch("https://mcapi.us/server/status/?ip=" + MC_DOMAIN);
                setStatus(await res.json())
            } catch (error) {
                setStatus(null)
            }
            setLoading(false)
        }
        getStatus()
    }, [isLoading])

    const statusMsg = isLoading ? "Loading..." : !status ? "Unable to reach API" : status.online ? "Running" : "Down"

    if (!status || !status.running) {
        return <div className="container">
            <h1>Status: {statusMsg}</h1>
            <button onClick={() => setLoading(true)}>
                refresh
        </button>
        </div>
    }
    return <div className="container">
        <h1>Status: {statusMsg}</h1>
        <h1>MOTD: {status.motd}</h1>
        <h1>Users: {status.players.length}/20</h1>
        <Table users={status.users} />
        <button onClick={() => setLoading(true)}>
            refresh
        </button>
    </div>
}

export default App
