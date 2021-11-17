import socketService from '../services/socketService';
import userService from '../services/userService';
var data = '{"results":[]}';
let getSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Co nguoi dang ket noi");

        socket.on("SendToServer", async (idAuction, price, idUser) => {
            console.log(idAuction);
            console.log(price);
            console.log(idUser);
            let auction = await socketService.setPriceAuction(idAuction, price, idUser);
            let u = await userService.getUserInAuction(idUser);

            var date = new Date();
            var parts = auction.timeEnd.split(':');
            var minutes = parts[0] * 60 * 60 + parts[1] * 60;
            var m = date.getMinutes() * 60 + date.getHours() * 60 * 60;

            if (minutes <= m) {
                data = '{"results":[]}';
            }

            var obj = JSON.parse(data);

            obj['results'].push({
                "userId": u.id,
                "userName": u.fullName,
                "price": price
            });
            data = JSON.stringify(obj);
            console.log(data);

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