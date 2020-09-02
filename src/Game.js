import React from 'react'
import Piece from './Piece.js'
import './index.css';

class Game extends React.Component{
    constructor(props){
        super(props)
        let tempBoard = [[{piece: 'br', at: 0, selected: false, move: false}, {piece: 'bn', at:1, selected: false, move: false}, {piece:'bb', at:2, selected: false, move: false},{piece:'bq', at:3, selected: false, move: false}, {piece: 'bk', at:4, selected: false, move: false},{piece:'bb',at:5, selected: false, move: false},{piece:'bn',at:6, selected: false, move: false},{piece:'br',at:7, selected: false, move: false}],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [{piece:'wr',at:56, selected: false, move: false},{piece:'wn',at:57, selected: false, move: false},{piece:'wb',at:58, selected: false, move: false},{piece:'wq',at:59, selected: false, move: false},{piece:'wk',at:60, selected: false, move: false},{piece:'wb',at:61, selected: false, move: false},{piece:'wn',at:62, selected: false, move: false},{piece:'wr',at:63, selected: false, move: false}],
        ]
        for(let i = 0; i<8; i++){
            tempBoard[1][i] = {piece: "bp", at: 8+i, selected: false, move: false}
            tempBoard[6][i] = {piece: 'wp', at:48+i, selected: false, move: false}
            for(let j = 2; j<6; j++){
                tempBoard[j][i] = {piece: 'na', at: j*8+i, selected: false, move: false};
            }
        }
        this.state = {
            gameBoard: tempBoard,
            turn: "White",
            selected: -1,
        }
        this.handleClick = this.handleClick.bind(this)
        this.computeSquares = this.computeSquares.bind(this)
    }

    render(){
        let curState = this.state.gameBoard
        return(
            <div className = "game">
                <div>
                    <h1>Chess</h1>
                    <p>Turn: {this.state.turn}</p>
                </div>
                <div>
                {
                    curState.map((object)=>
                        <div className = "board-row"> {object.map((object2) => 
                        <Piece key={object2.at} turn = {this.state.turn} selected = {object2.selected} move = {object2.move} piece = {object2.piece} identifier = {object2.at} onClick = {() => this.handleClick(object2.at)} color = {(object2.at+Math.floor(object2.at/8))%2 === 0?"white":"black"} />)} </div>
                    )
                }
                </div>
            </div>
        )
    }

    computeSquares(num){ // computes possible moves
        let x = Math.floor(num/8)
        let ret = []
        let y = num%8
        console.log(x)
        console.log(y)
        let curSquare = this.state.gameBoard[x][y];
        let curPiece = curSquare.piece;
        if(curPiece === 'br' || curPiece === 'wr'){
            let i = x-1;
            while(i>=0){
                if(this.state.gameBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i--;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = x+1;
            while(i<8){
                if(this.state.gameBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i++;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = y-1;
            while(i>=0){
                if(this.state.gameBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i--;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
            i=y+1;
            while(i<8){
                if(this.state.gameBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i++;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
        }
        else if(curPiece === 'bk' || curPiece === 'wk'){
            if(x+1<8){
                if(y+1<8 && this.state.gameBoard[x+1][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y+1)
                }
                if(y-1>=0 && this.state.gameBoard[x+1][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y-1)
                }
                if(this.state.gameBoard[x+1][y].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y)
                }
            }
            if(x-1>=0){
                if(y+1<8 && this.state.gameBoard[x-1][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y+1)
                }
                if(y-1>=0 && this.state.gameBoard[x-1][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y-1)
                }
                if(this.state.gameBoard[x-1][y].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y)
                }
            }
            if(y+1<8 && this.state.gameBoard[x][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*x+y+1)
            }
            if(y-1>=0 && this.state.gameBoard[x][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*x+y-1)
            }
        }
        else if(curPiece === 'bp'){
            if(x===1){
                let i = x+1;
                while(i<4){
                    if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                        ret.push(8*i+y)
                        i++;
                    }
                    else{
                        break;
                    }
                }
            }
            else if(x<7 && this.state.gameBoard[x+1][y].piece === 'na'){
                ret.push(8*(x+1)+y)
            }
            if(x<7&&((y>0 && this.state.gameBoard[x+1][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0) && this.state.gameBoard[x+1][y-1].piece.charAt(0) !== 'n'))){
                ret.push(8*(x+1)+y-1)
            }
            if(x<7&&(y<7 && this.state.gameBoard[x+1][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0) && this.state.gameBoard[x+1][y+1].piece.charAt(0) !== 'n')){
                ret.push(8*(x+1)+y+1)
            }
        }
        else if(curPiece === 'wp'){
            if(x===6){
                let i = x-1;
                while(i>3){
                    if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                        ret.push(8*i+y)
                        i--;
                    }
                    else{
                        break;
                    }
                }
            }
            else if(x>0 && this.state.gameBoard[x-1][y].piece === 'na'){
                ret.push(8*(x-1)+y)
            }
            if(x>0&&((y>0 && this.state.gameBoard[x-1][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0) && this.state.gameBoard[x-1][y-1].piece.charAt(0) !== 'n'))){
                ret.push(8*(x-1)+y-1)
            }
            if(x>0&&(y<7 && this.state.gameBoard[x-1][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0) && this.state.gameBoard[x-1][y+1].piece.charAt(0) !== 'n')){
                ret.push(8*(x-1)+y+1)
            }
        }
        else if(curPiece === 'bb' || curPiece === 'wb'){
            let i = x+1;
            let j = y+1
            while(i<8 && j<8 ){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*(i)+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j++;
            }
            i = x+1;
            j = y-1;
            while(i<8 && j>=0){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j--;
            }
            i = x-1;
            j = y-1;
            while(i>=0 && j>=0){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j--;
            }
            i=x-1;
            j=y+1;
            while(i>=0 && j<8){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j++;
            }
        }
        else if(curPiece === 'bq' || curPiece === 'wq'){
            let i = x-1;
            while(i>=0){
                if(this.state.gameBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i--;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = x+1;
            while(i<8){
                if(this.state.gameBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i++;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = y-1;
            while(i>=0){
                if(this.state.gameBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i--;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
            i=y+1;
            while(i<8){
                if(this.state.gameBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(this.state.gameBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i++;
                }
                else if(this.state.gameBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
            i = x+1;
            let j = y+1
            while(i<8 && j<8 ){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*(i)+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j++;
            }
            i = x+1;
            j = y-1;
            while(i<8 && j>=0){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j--;
            }
            i = x-1;
            j = y-1;
            while(i>=0 && j>=0){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j--;
            }
            i=x-1;
            j=y+1;
            while(i>=0 && j<8){
                if(this.state.gameBoard[i][j].piece.charAt(0) === this.state.gameBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(this.state.gameBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j++;
            }

        }
        else if(curPiece === 'bn' || curPiece === 'wn'){
            if(x+2<8 && y+1 < 8 && this.state.gameBoard[x+2][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+2)+y+1);
            }
            if(x+2<8 && y-1>=0 &&  this.state.gameBoard[x+2][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+2)+y-1);
            }
            if(x+1<8 && y+2 < 8 && this.state.gameBoard[x+1][y+2].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+1)+y+2);
            }
            if(x+1<8 && y-2 >=0 && this.state.gameBoard[x+1][y-2].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+1)+y-2);
            }
            if(x-2>=0 && y+1 < 8 && this.state.gameBoard[x-2][y+1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-2)+y+1);
            }
            if(x-2>=0 && y-1>=0 &&  this.state.gameBoard[x-2][y-1].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-2)+y-1);
            }
            if(x-1>=0 && y+2 < 8 && this.state.gameBoard[x-1][y+2].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-1)+y+2);
            }
            if(x-1>=0 && y-2 >=0 && this.state.gameBoard[x-1][y-2].piece.charAt(0) !== this.state.gameBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-1)+y-2);
            }
        }
        return ret;
    }

    handleClick(num){
        this.setState(prevState => {
            /*const newBoard = prevState.gameBoard.map(row => {
                return row.map(element => {
                    if(element.at === num){
                        element.selected = !element.selected
                    }
                    return element
                })
            })*/
            //const newBoard = prevState.gameBoard.slice(0,8);
            console.log(this.state.gameBoard)
            const newBoard = []
            for(let i = 0; i<8; i++){
                newBoard.push([])
                for(let j  = 0; j<8; j++){
                    newBoard[i].push({piece: prevState.gameBoard[i][j].piece, at: prevState.gameBoard[i][j].at, select: prevState.gameBoard[i][j].select, move: prevState.gameBoard[i][j].move})
                }
            }
            for(let i = 0; i<8; i++){
                for(let j = 0; j<8;j++){
                    newBoard[i][j].selected = false;
                    newBoard[i][j].move = false;
                }
            }
            let newSelected = -1
            let nextTurn = prevState.turn;
            if(prevState.gameBoard[Math.floor(num/8)][num%8].piece.charAt(0) === prevState.turn.toLowerCase().charAt(0) || prevState.gameBoard[Math.floor(num/8)][num%8].move){
                if(!prevState.gameBoard[Math.floor(num/8)][num%8].selected && !prevState.gameBoard[Math.floor(num/8)][num%8].move){
                    newSelected = num
                    newBoard[Math.floor(num/8)][num%8].selected = true;
                    let possibles = this.computeSquares(num);
                    for(let i = 0; i<possibles.length; i++){
                        newBoard[Math.floor(possibles[i]/8)][possibles[i]%8].move = true;
                    }
                }
                else if(prevState.gameBoard[Math.floor(num/8)][num%8].move){
                    let pieceToMove = newBoard[Math.floor(this.state.selected/8)][this.state.selected%8].piece
                    newBoard[Math.floor(this.state.selected/8)][this.state.selected%8].piece = "na"
                    newBoard[Math.floor(num/8)][num%8].piece = pieceToMove
                    nextTurn = prevState.turn==="White"?"Black":"White"
                }
            }
            return{
                gameBoard: newBoard,
                turn: nextTurn,
                selected: newSelected,
            }
        });
    }
}

export default Game