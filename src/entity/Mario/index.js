import React from 'react';
import { connect } from "react-redux";
import updatePosition from './actions';

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
export const MarioMove = (e) => {
    switch (e.keyCode) {
        case 37:
            updatePosition('LEFT');
            break;
        case 38:
            updatePosition('UP');
            break;
        case 39:
            updatePosition('RIGHT');
            break;
        case 40:
            updatePosition('DOWN');
            break;
        default:
            console.log(e.keyCode)
    }
}