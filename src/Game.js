import React from 'react'
import Piece from './Piece.js'
import './index.css';
import MoveButton from './MoveButton.js'

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
        let tempmoves = []
        this.state = {
            gameBoard: [tempBoard,],
            displayBoard: tempBoard,
            turn: "White",
            selected: -1,
            enPassant: false,
            ep: -1,
            moves: tempmoves,
            moveNum: 0,
        }
        this.handleClick = this.handleClick.bind(this)
        this.computeSquares = this.computeSquares.bind(this)
    }

    render(){
        let curState = this.state.displayBoard
        let curMoves = this.state.moves;
        return(
            <div className = "game">
                <div>
                    <h1>Chess</h1>
                </div>
                <div className = "board-move-container">
                    <div className = "board-container">
                    <p>Turn: {this.state.turn}</p>
                    {
                        curState.map((object)=>
                            <div className = "board-row"> {object.map((object2) => 
                            <Piece key={object2.at} turn = {this.state.turn} selected = {object2.selected} move = {object2.move} piece = {object2.piece} identifier = {object2.at} onClick = {() => this.handleClick(object2.at)} color = {(object2.at+Math.floor(object2.at/8))%2 === 0?"white":"black"} />)} </div>
                        )
                    }
                    </div>
                    <div className = "moves">
                        <h3>Moves made:</h3>
                        {
                            curMoves.map((object)=>
                                <div className = "move-row"> {object.map((object2) =>
                                    <MoveButton identifier = {object2.iden} display = {object2.moveDis} onClick = {()=>this.moveClick(object2)}/>
                                )}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    moveClick(move){
        this.setState(prevState =>{
            if(move.iden === 1){
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
                let tempmoves = []
                return({
                    gameBoard: [tempBoard,],
                    displayBoard: tempBoard,
                    turn: "White",
                    selected: -1,
                    enPassant: false,
                    ep: -1,
                    moves: tempmoves,
                    moveNum: 0,
                })
            }
            console.log("asdfads:" + move.iden)
            let newBoard = prevState.gameBoard.slice(0,move.iden)
            let newTurn = move.iden === 0?"White":"Black"
            let newenPassant = move.enPass
            let newEp = move.ep
            let newMoves = prevState.moves.slice(0,Math.ceil((move.iden-1)/2))
            newMoves[newMoves.length-1] = newMoves[newMoves.length-1].slice(0,(move.iden-1)%2)
            let newMoveNum = move.iden-1
            return({
                gameBoard: newBoard,
                turn: newTurn,
                selected: -1,
                enPassant: newenPassant,
                ep:  newEp,
                moves: newMoves,
                moveNum: newMoveNum,
                displayBoard: newBoard[newBoard.length-1]
            })
        }
        )
    }

    computeSquares(num){ // computes possible moves
        let x = Math.floor(num/8)
        let ret = []
        let y = num%8
        let curBoard = this.state.displayBoard;
        let curSquare = curBoard[x][y];
        let curPiece = curSquare.piece;
        if(curPiece === 'br' || curPiece === 'wr'){
            let i = x-1;
            while(i>=0){
                if(curBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i--;
                }
                else if(curBoard[i][y].piece.charAt(0) !== (this.state.turn.toLowerCase().charAt(0))){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = x+1;
            while(i<8){
                if(curBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i++;
                }
                else if(curBoard[i][y].piece.charAt(0) !== (this.state.turn.toLowerCase().charAt(0))){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = y-1;
            while(i>=0){
                if(curBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i--;
                }
                else if(curBoard[i][y].piece.charAt(0)  !== (this.state.turn.toLowerCase().charAt(0))){
                    ret.push(8*x+i)
                    break;
                }
            }
            i=y+1;
            while(i<8){
                if(curBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i++;
                }
                else if(curBoard[i][y].piece.charAt(0) !== (this.state.turn.toLowerCase().charAt(0))){
                    ret.push(8*x+i)
                    break;
                }
            }
        }
        else if(curPiece === 'bk' || curPiece === 'wk'){
            if(x+1<8){
                if(y+1<8 && curBoard[x+1][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y+1)
                }
                if(y-1>=0 && curBoard[x+1][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y-1)
                }
                if(curBoard[x+1][y].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x+1)+y)
                }
            }
            if(x-1>=0){
                if(y+1<8 && curBoard[x-1][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y+1)
                }
                if(y-1>=0 && curBoard[x-1][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y-1)
                }
                if(curBoard[x-1][y].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                    ret.push(8*(x-1)+y)
                }
            }
            if(y+1<8 && curBoard[x][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*x+y+1)
            }
            if(y-1>=0 && curBoard[x][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*x+y-1)
            }
        }
        else if(curPiece === 'bp'){
            if(x===1){
                let i = x+1;
                while(i<4){
                    if(curBoard[i][y].piece.charAt(0) === 'n'){
                        ret.push(8*i+y)
                        i++;
                    }
                    else{
                        break;
                    }
                }
            }
            else if(x<7 && curBoard[x+1][y].piece === 'na'){
                ret.push(8*(x+1)+y)
            }
            if(x<7&&((y>0 && curBoard[x+1][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0) && curBoard[x+1][y-1].piece.charAt(0) !== 'n'))){
                ret.push(8*(x+1)+y-1)
            }
            if(x<7&&(y<7 && curBoard[x+1][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0) && curBoard[x+1][y+1].piece.charAt(0) !== 'n')){
                ret.push(8*(x+1)+y+1)
            }
            if(this.state.enPassant && x===4 && (y-1===this.state.ep || y+1 === this.state.ep)){
                ret.push(8*(x+1)+this.state.ep);
            }
        }
        else if(curPiece === 'wp'){
            if(x===6){
                let i = x-1;
                while(i>3){
                    if(curBoard[i][y].piece.charAt(0) === 'n'){
                        ret.push(8*i+y)
                        i--;
                    }
                    else{
                        break;
                    }
                }
            }
            else if(x>0 && curBoard[x-1][y].piece === 'na'){
                ret.push(8*(x-1)+y)
            }
            if(x>0&&((y>0 && curBoard[x-1][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0) && curBoard[x-1][y-1].piece.charAt(0) !== 'n'))){
                ret.push(8*(x-1)+y-1)
            }
            if(x>0&&(y<7 && curBoard[x-1][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0) && curBoard[x-1][y+1].piece.charAt(0) !== 'n')){
                ret.push(8*(x-1)+y+1)
            }
            if(this.state.enPassant && x===3 && (y-1===this.state.ep || y+1 === this.state.ep)){
                ret.push(8*(x-1)+this.state.ep);
            }
        }
        else if(curPiece === 'bb' || curPiece === 'wb'){
            let i = x+1;
            let j = y+1
            while(i<8 && j<8 ){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*(i)+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j++;
            }
            i = x+1;
            j = y-1;
            while(i<8 && j>=0){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j--;
            }
            i = x-1;
            j = y-1;
            while(i>=0 && j>=0){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j--;
            }
            i=x-1;
            j=y+1;
            while(i>=0 && j<8){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j++;
            }
        }
        else if(curPiece === 'bq' || curPiece === 'wq'){
            let i = x-1;
            while(i>=0){
                if(curBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i--;
                }
                else if(curBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = x+1;
            while(i<8){
                if(curBoard[i][y].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    ret.push(8*i+y)
                    i++;
                }
                else if(curBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*i+y)
                    break;
                }
            }
            i = y-1;
            while(i>=0){
                if(curBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i--;
                }
                else if(curBoard[x][i].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
            i=y+1;
            while(i<8){
                if(curBoard[x][i].piece.charAt(0) === curPiece.charAt(0)){
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    ret.push(8*x+i)
                    i++;
                }
                else if(curBoard[i][y].piece.charAt(1) !== 'k'){
                    ret.push(8*x+i)
                    break;
                }
            }
            i = x+1;
            let j = y+1
            while(i<8 && j<8 ){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*(i)+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j++;
            }
            i = x+1;
            j = y-1;
            while(i<8 && j>=0){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i++;
                j--;
            }
            i = x-1;
            j = y-1;
            while(i>=0 && j>=0){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j--;
            }
            i=x-1;
            j=y+1;
            while(i>=0 && j<8){
                if(curBoard[i][j].piece.charAt(0) === curBoard[x][y].piece.charAt(0)){
                    break;
                }
                ret.push(8*i+j);
                if(curBoard[i][j].piece.charAt(0) !== 'n'){
                    break;
                }
                i--;
                j++;
            }

        }
        else if(curPiece === 'bn' || curPiece === 'wn'){
            if(x+2<8 && y+1 < 8 && curBoard[x+2][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+2)+y+1);
            }
            if(x+2<8 && y-1>=0 && curBoard[x+2][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+2)+y-1);
            }
            if(x+1<8 && y+2 < 8 && curBoard[x+1][y+2].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+1)+y+2);
            }
            if(x+1<8 && y-2 >=0 && curBoard[x+1][y-2].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x+1)+y-2);
            }
            if(x-2>=0 && y+1 < 8 && curBoard[x-2][y+1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-2)+y+1);
            }
            if(x-2>=0 && y-1>=0 &&  curBoard[x-2][y-1].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-2)+y-1);
            }
            if(x-1>=0 && y+2 < 8 && curBoard[x-1][y+2].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-1)+y+2);
            }
            if(x-1>=0 && y-2 >=0 && curBoard[x-1][y-2].piece.charAt(0) !== curBoard[x][y].piece.charAt(0)){
                ret.push(8*(x-1)+y-2);
            }
        }
        return ret;
    }

    indexToPosition(index){
        let ret = ""
        switch(index%8){
            case 0: ret += "a";break;
            case 1: ret += "b";break;
            case 2: ret += "c";break;
            case 3: ret += "d"; break;
            case 4: ret += "e";break;
            case 5: ret+="f";break;
            case 6: ret+="g";break;
            case 7: ret += "h";break;
            default: ret +="Error";break;
        }
        switch(Math.floor(index/8)){
            case 0: ret += "8";break;
            case 1: ret+="7";break;
            case 2:ret+="6";break;
            case 3:ret+="5";break;
            case 4:ret+="4";break;
            case 5:ret+="3";break;
            case 6:ret+="2";break;
            case 7:ret+="1";break;
            default: ret+="Error";break;
        }
        return ret
    }

    getPiece(st){
        let ret = ""
        switch(st){
            case 'p':break;
            default: ret += st.toUpperCase();break;
        }
        return ret;
    }

    getAttackSquares(piece, num){
        let ret = []
        let x = Math.floor(num/8)
        let y = num%8
        let curBoard = this.state.displayBoard;
        if(piece === 'b'){

        }
        if(piece === 'p'){

        }
        if(piece === 'k'){

        }
        if(piece === 'n'){

        }
        if(piece === 'r'){
            let i = x-1;
            while(i>=0){
                if(curBoard[i][y].piece.charAt(1) === piece.charAt(0) && curBoard[i][y].piece.charAt(0) === this.state.turn.toLowerCase().charAt(0)){
                    ret.push(8*i+y)
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    i--;
                }
                else{
                    break;
                }
            }
            i = x+1;
            while(i<8){
                if(curBoard[i][y].piece.charAt(1) === piece.charAt(0) && curBoard[i][y].piece.charAt(0) === this.state.turn.toLowerCase().charAt(0)){
                    ret.push(8*i+y)
                    break;
                }
                else if(curBoard[i][y].piece.charAt(0) === 'n'){
                    i++;
                }
                else {
                    break;
                }
            }
            i = y-1;
            while(i>=0){
                if(curBoard[x][i].piece.charAt(1) === piece.charAt(0) && curBoard[x][i].piece.charAt(0) === this.state.turn.toLowerCase().charAt(0)){
                    ret.push(8*x+i)
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    i--;
                }
                else {
                    break;
                }
            }
            i=y+1;
            while(i<8){
                if(curBoard[x][i].piece.charAt(1) === piece.charAt(0) && curBoard[x][i].piece.charAt(0) === this.state.turn.toLowerCase().charAt(0)){
                    ret.push(8*x+i)
                    break;
                }
                else if(curBoard[x][i].piece.charAt(0) === 'n'){
                    i++;
                }
                else {
                    break;
                }
            }
        }
        if(piece === 'q'){

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
            console.log(this.state)
            const newBoard = []
            let enPass = this.state.enPassant;
            let epNew = this.state.ep;
            let tempMoves = this.state.moves;
            let newMoveNum = prevState.moveNum;
            let curBoard = prevState.displayBoard;
            for(let i = 0; i<8; i++){
                newBoard.push([])
                for(let j  = 0; j<8; j++){
                    newBoard[i].push({piece: curBoard[i][j].piece, at: curBoard[i][j].at, select: curBoard[i][j].select, move: curBoard[i][j].move})
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
            if(curBoard[Math.floor(num/8)][num%8].piece.charAt(0) === prevState.turn.toLowerCase().charAt(0) || curBoard[Math.floor(num/8)][num%8].move){
                if(!curBoard[Math.floor(num/8)][num%8].selected && !curBoard[Math.floor(num/8)][num%8].move){
                    newSelected = num
                    newBoard[Math.floor(num/8)][num%8].selected = true;
                    let possibles = this.computeSquares(num);
                    for(let i = 0; i<possibles.length; i++){
                        newBoard[Math.floor(possibles[i]/8)][possibles[i]%8].move = true;
                    }
                }
                else if(curBoard[Math.floor(num/8)][num%8].move){
                    let pieceToMove = newBoard[Math.floor(this.state.selected/8)][this.state.selected%8].piece
                    enPass = false;
                    epNew = "na";
                    let capture = (newBoard[Math.floor(num/8)][num%8].piece === "na")?"":"x"
                    let attackPos = this.getAttackSquares(pieceToMove.substr(1,2), num)
                    enPass = (Math.floor(this.state.selected/8)===1 && Math.floor(num/8) === 3 && this.state.turn === "Black");
                    enPass = enPass || (Math.floor(this.state.selected/8)===6 && Math.floor(num/8) === 4 && this.state.turn==="White");
                    enPass = enPass && pieceToMove.charAt(1)==='p';
                    if(enPass){
                        epNew = num%8;
                    }
                    if(this.state.enPassant && (num%8)===this.state.ep && pieceToMove.charAt(1)==='p'){
                        if(this.state.turn === "Black"&&Math.floor(num/8)===5){
                            newBoard[Math.floor(num/8)-1][num%8].piece = "na"
                            capture = "x"
                        }
                        else if(this.state.turn==="White"&&Math.floor(num/8)===2){
                            newBoard[Math.floor(num/8)+1][num%8].piece = "na"
                            capture = "x"
                        }
                    }
                    let notation = this.getPiece(pieceToMove.substr(1,2))
                    if(attackPos.length >1){
                        notation += this.indexToPosition(this.state.selected)
                    }
                    if(prevState.turn === "White"){
                        tempMoves.push([]);
                    }
                    tempMoves[tempMoves.length-1].push({iden: prevState.moveNum+1, enPass: prevState.enPassant, ep: prevState.ep, moveDis: notation + capture + this.indexToPosition(num)})
                    newBoard[Math.floor(this.state.selected/8)][this.state.selected%8].piece = "na"
                    newBoard[Math.floor(num/8)][num%8].piece = pieceToMove
                    nextTurn = prevState.turn==="White"?"Black":"White"
                    newMoveNum++;
                    prevState.gameBoard.push(newBoard);
                }
            }
            return{
                gameBoard: prevState.gameBoard,
                turn: nextTurn,
                selected: newSelected,
                enPassant: enPass,
                ep: epNew,
                moves: tempMoves,
                moveNum: newMoveNum,
                displayBoard: newBoard
            }
        });
    }
}

export default Game