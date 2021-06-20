import React, {useEffect, useState} from 'react'

function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Username (hover for history)</th>
                <th>Avatar (hover for skin, click for download)</th>
            </tr>
        </thead>
    )
}


function TableElement(props) {
    const uuid = props.user['id']
    const [names, setNames] = useState(null)
    const [hover, setHover] = useState(false)
    useEffect(() => {
        if (names) {return}
        async function getNames() {
            try {
                const res = await fetch(`https://www.mc-heads.net/minecraft/profile/${uuid}`);
                const json_obj = await res.json()
                setNames(json_obj['name_history'].map((o) => o['name']))
            } catch (error) {
                setNames(null)
            }
        }
        getNames()
    })
    return (
        <tr
            onClick={() => {window.open(`https://www.mc-heads.net/download/${uuid}`)}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <td key="name">{names && hover ? names.toString().split(",").map((n, i) => {return <span key={i}><br />{n}</span>}) : props.user['name']}</td>
            <td key="img"><img
                src={`https://www.mc-heads.net/${hover ? "body" : "avatar"}/${uuid}`}
                alt={props.user['name'] + " avatar"}
                width="100" height={hover ? "200" : "100"}>
            </img></td>
        </tr>
    )
}

function Table(props){
    if (!props.users) {
        return null
    } 
    const valid = props.users.filter((u) => u['id'] !== "00000000-0000-0000-0000-000000000000")
    if (!valid.length) {
        return null
    }
    return (
        <table>
            <TableHeader key="header" />
            <tbody>
                {valid.map((user, index) => {
                    return <TableElement key={index} user={user} />
                })}
            </tbody>
        </table>
    )
}

export default Table