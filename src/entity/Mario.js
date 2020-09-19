import React from 'react';

import { Sprite } from 'react-spritesheet';

function Mario() {
    return (
        <div>
            <Sprite filename="/img/characters.gif" x={40} y={40} width={40} height={40} />
        </div>
    );
}

export default Mario;