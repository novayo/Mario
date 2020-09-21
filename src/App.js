import React, { Component } from 'react';

import { MarioKeydown } from './entity/Mario';
import World from './entity/World';
import WorldTime from './entity/World/time';

class App extends Component {
  componentDidMount() {
    document.onkeydown = MarioKeydown;
    setInterval(WorldTime, 16); // 60 fps
  }

  render() {
    return (
      <World />
    );
  }
}

export default App;
