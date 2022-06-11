/* eslint-disable @typescript-eslint/no-var-requires */
const characters = require("../src/constant/characters.json");
const path = require("path");
const fs = require("fs");

const characterSCSSfile = path.join(__dirname, "../src/pages/Character.scss");

const COLUMN_LENGTH = 9;
const SPRITE_HEIGHT = 125;

const data = characters.reduce(
    (acc: string, cur: { name: string }, i: number) => {
        const row = Math.floor(i / COLUMN_LENGTH);
        const col = i % COLUMN_LENGTH;
        const top = col * SPRITE_HEIGHT === 0 ? 0 : `-${col * SPRITE_HEIGHT}px`;
        const left = row * SPRITE_HEIGHT === 0 ? 0 : `-${row * SPRITE_HEIGHT}px`;
        return (
            acc +
            `span[id="${cur.name}"] {
    background-position: ${top} ${left};
}
    `
        );
    },
    `
.character-avatar {
    display: inline-block;
    background: url("../assets/sprite/characters.png");
    width: 100px;
    height: 100px;
}
`
);

fs.writeFileSync(characterSCSSfile, data);
