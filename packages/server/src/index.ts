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
        // randomly adjust score and then sort
        current = current.sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
        return current;
    };
}

export const generator = rankingGenerator();

io.on("connection", (socket) => {
    setInterval(() => {
        socket.broadcast.emit("hello", generator());
    }, 1000);
});
