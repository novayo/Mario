import React from 'react';
import { connect } from "react-redux";
import { move, jump } from './action';

function MarioMain(props) {
    return (
        <div className="mario mario-normal-small-idle"
            style={{ top: props.position.top, left: props.position.left }}></div>
    );
}

function mapStateToProps(state) {
    return {
        ...state.marioReducer
    }
}

export let Mario = connect(mapStateToProps)(MarioMain);
export const MarioKeydown = (e) => {
    switch (e.keyCode) {
        case 37:
            move('LEFT');
            break;
        case 38:
            move('UP');
            break;
        case 39:
            move('RIGHT');
            break;
        case 40:
            move('DOWN');
            break;
        case 32:
            jump();
            break;
        default:
            // console.log(e.keyCode);
            break;
    }
}