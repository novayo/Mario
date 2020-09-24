import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawBlocks } from './action';
import { level_1_1 } from './levels';

class Background extends Component {

    componentDidMount() {
        let level = level_1_1();
        level.map((data) => {
            return (
                drawBlocks(data)
            )
        })
    }

    render() {
        if (this.props.loading === false) {
            return (
                <div className="background blue-sky">
                    {
                        this.props.blocks.map((value, index) => {
                            return (
                                <div key={index} className="background block1" style={{ top: value[0], left: value[1], }}></div>
                            );
                        })
                    }
                </div>
            );
        }
        else {
            return (<div>Loading</div>);
        }

    }
}

function mapStateToProps(state) {
    return ({
        ...state.worldReducer,
    });
}
export default connect(mapStateToProps)(Background);
