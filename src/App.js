import React, { Component } from 'react';

import { MarioKeydown, MarioKeyUp } from './entity/Mario/input';
import World from './entity/World';
import { WorldTime } from './entity/World/worldTime';

class App extends Component {
  componentDidMount() {
    document.onkeydown = MarioKeydown;
    document.onkeyup = MarioKeyUp;
    setInterval(WorldTime, 16); // 60 fps
  }

  render() {
    return (
      <World />
    );
  }
}

export default App;
