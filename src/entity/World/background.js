import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawBlock1 } from './action';

class Background extends Component {
    state = {
        isLoading: true,
    }

    componentDidMount() {
        drawBlock1(0, 25, 12); // floor 1
        drawBlock1(0, 25, 13); // floor 2
        drawBlock1(0, 4, 7); // test block
        drawBlock1(8, 11, 7); // test block
        drawBlock1(8, 11, 8); // test block
        drawBlock1(8, 11, 9); // test block
        drawBlock1(14, 15, 9); // test block

        drawBlock1(17, 18, 7); // test block
        drawBlock1(17, 18, 8); // test block
        drawBlock1(17, 18, 9); // test block

        drawBlock1(19, 20, 7); // test block
        drawBlock1(19, 20, 8); // test block
        drawBlock1(19, 20, 9); // test block

        drawBlock1(0, 8, 10); // test block
    }

    render() {

        if (this.props.blocks !== null) {
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
