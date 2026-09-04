const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pc.html"));
});

io.on("connection", (socket) => {
    console.log("Device connected:", socket.id);

    socket.on("register", ({ device, room }) => {
        if (!device || !room) return;

        socket.deviceType = device;
        socket.room = String(room).trim().toUpperCase();

        socket.join(`${socket.room}:${device}`);

        console.log(`${device} connected to room ${socket.room}`);
    });

    socket.on("capture", () => {
        if (!socket.room || socket.deviceType !== "pc") return;

        console.log(`Capture requested for room ${socket.room}`);
        io.to(`${socket.room}:phone`).emit("capture");
    });

    socket.on("photo", (photoData) => {
        if (!socket.room || socket.deviceType !== "phone") return;

        console.log(`Photo received for room ${socket.room}`);
        io.to(`${socket.room}:pc`).emit("photo", photoData);
    });

    socket.on("disconnect", () => {
        console.log("Device disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
