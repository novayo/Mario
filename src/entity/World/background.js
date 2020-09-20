import React from 'react';

export default function Background() {
    return (
        <div className="background blue-sky">
            {
                base().map((value, index) => {
                    return (
                        <div key={index} className="background block1" style={{ top: value[0], left: value[1], }}></div>
                    );
                })
            }
        </div>
    );
}

function base() {
    var position = [];
    for (var i = 0; i < 25; i++) {
        position.push([48 * 12, i * 48]);
        position.push([48 * 13, i * 48]);
    }
    return position;
}