let getSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Co nguoi dang ket noi");

        socket.on("SendToServer", (data) => {
            console.log(data);
            let user = 'Loi';
            io.sockets.emit("SendToClient", user);
        });
    });
}

let getSocket1 = (io) => {
    io.on("connection", (socket) => {
        console.log("Co nguoi dang ket noi 1");

        socket.on("SendToServer1", (data) => {
            console.log(data);
            io.sockets.emit("SendToClient1", data + "aaa");
        });
    });
}

module.exports = {
    getSocket: getSocket,
    getSocket1: getSocket1
}