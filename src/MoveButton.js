import React from 'react'

function MoveButton(props){
    return(
        <button className = "move-button" identifier = {props.identifier} onClick = {props.onClick}>{props.display}</button>
    )
}

export default MoveButton;