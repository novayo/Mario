import React, { Component } from 'react';

import { Mario } from '../Mario';
import Background from '../World/background';

class World extends Component {

    render() {
        return (
            <div>
                <Background />
                <Mario />
            </div>
        )
    }
}

export default World;