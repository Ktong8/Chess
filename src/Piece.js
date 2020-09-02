import React from 'react'
import bk from './images/bk.png'
import wk from './images/wk.png'
import bp from './images/bp.png'
import wp from './images/wp.png'
import bb from './images/bb.png'
import wb from './images/wb.png'
import bn from './images/bn.png'
import wn from './images/wn.png'
import br from './images/br.png'
import wr from './images/wr.png'
import bq from './images/bq.png'
import wq from './images/wq.png'

function Piece(props){
        let imgSrc;
        switch(props.piece){
            case 'bk': imgSrc = bk; break;
            case 'wk': imgSrc = wk; break;
            case 'bp': imgSrc = bp; break;
            case 'wp': imgSrc = wp; break;
            case 'bb': imgSrc = bb; break;
            case 'wb': imgSrc = wb; break;
            case 'bq': imgSrc = bq; break;
            case 'wq': imgSrc = wq; break;
            case 'br': imgSrc = br; break;
            case 'wr': imgSrc = wr; break;
            case 'bn': imgSrc = bn; break;
            case 'wn': imgSrc = wn; break;
            default: imgSrc = ""; break; 
        }
        return(
            <button className = {props.color} onClick = {props.onClick} style = {props.selected?{backgroundColor:"gray"}:props.move?{backgroundColor:"green"}:{}}>
                {props.piece !== "na"?<img className = "squarePiece" src = {imgSrc} alt = {props.piece}/> : ""}
            </button>
        )
}

export default Piece