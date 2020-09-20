import React, { Component } from 'react';

import { MarioMove } from './entity/Mario';
import World from './entity/World';

class App extends Component {
  componentDidMount() {
    document.onkeydown = MarioMove;
  }

  render() {
    return (
      <World />
    );
  }
}

export default App;
