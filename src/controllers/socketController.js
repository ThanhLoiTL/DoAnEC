import socketService from '../services/socketService';

let getSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Co nguoi dang ket noi");

        socket.on("SendToServer", async (idAuction, price) => {
            console.log(idAuction);
            console.log(price);
            let auction = await socketService.setPriceAuction(idAuction, price);
            io.sockets.emit("SendToClient", JSON.stringify(auction));
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