import characters from "./characters.json";
import express from "express";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import cors from "cors";
import http from "http";

interface CharacterInfo {
    id: string;
    name: string;
    score: number;
}

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

server.listen(process.env.PORT || 8999, () => {
    console.log("Server started");
});

function rankingGenerator(): () => CharacterInfo[] {
    let current: CharacterInfo[] = characters.map(({ name }) => ({ id: uuid(), name, score: Math.floor(Math.random() * 100) }));
    return () => {
        current = current
            .map(({ score, ...rest }) => {
                const sameScore = Math.random() < 0.5;
                if (sameScore) return { ...rest, score };

                let newScore = score + randomDelta();

                while (newScore < 0 || newScore > 100) {
                    newScore = score + randomDelta();
                }

                return {
                    ...rest,
                    score: newScore,
                };
            })
            .sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
        return current;
    };
}

function randomDelta() {
    const sameScore = Math.random() < 0.5;
    if (sameScore) return 0;
    return (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * (Math.random() * 10));
}

export const generator = rankingGenerator();

io.on("connection", (socket) => {
    socket.broadcast.emit("update", generator());

    setInterval(() => {
        console.log("update");
        socket.broadcast.emit("update", generator());
    }, 10000);
});
