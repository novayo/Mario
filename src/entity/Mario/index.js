import React, { Component } from 'react';
import { connect } from "react-redux";
import Store from '../../config/store';

class MarioMain extends Component {
    render() {
        if (Store.getState().worldReducer.loading === false) {
            return (
                <div className="mario mario-normal-small-idle"
                    style={{
                        top: this.props.position.top,
                        left: this.props.position.left,
                        width: `${this.props.size.width}px`,
                        height: `${this.props.size.height}px`,
                    }}>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.marioReducer
    }
}

export let Mario = connect(mapStateToProps)(MarioMain);
