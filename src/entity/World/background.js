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
        drawBlock1(5, 6, 9); // test block
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
