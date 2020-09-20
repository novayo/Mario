import React from 'react';

import { Mario } from '../Mario';
import Background from '../World/background';

export default function World() {
    return (
        <div>
            <Background />
            <Mario />
        </div>
    )
}