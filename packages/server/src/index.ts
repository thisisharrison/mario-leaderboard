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
    console.info("Server started");
});

function rankingGenerator(): () => CharacterInfo[] {
    let current: CharacterInfo[] = characters.map(({ name }) => ({ id: uuid(), name, score: Math.floor(Math.random() * 100) }));
    let timestamp = new Date();

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

        const now = new Date();
        console.info(`Time passed: ${(now.getTime() - timestamp.getTime()) / 1000}`);
        timestamp = now;

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
    socket.emit("update", generator());

    const intervalId = setInterval(() => {
        console.info("socket update");
        socket.emit("update", generator());
    }, 3000);

    socket.on("disconnect", () => {
        console.info("socket disconnect");
        clearInterval(intervalId);
        io.disconnectSockets();
    });

    socket.on("close", () => {
        console.info("socket close");
        clearInterval(intervalId);
        io.close();
    });
});
