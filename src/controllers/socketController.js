import socketService from '../services/socketService';
import userService from '../services/userService';
var data = [];
var idBanner;
let getSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Co nguoi dang ket noi");

        socket.on("SendToServer", async (idAuction, price, idUser) => {

            let auction = await socketService.setPriceAuction(idAuction, price, idUser);
            let u = await userService.getUserInAuction(idUser);
            idBanner = auction.bannerId;
            var date = new Date();
            const date3 = new Date();
            const yyyy = date3.getFullYear();
            const mmm = date3.getMonth();
            const dd = date3.getDate();
            const hh = date3.getHours();
            const mm = date3.getMinutes();
            const ss = date3.getSeconds();
            const dateText = `${dd}-${mmm + 1}-${yyyy} vào lúc ${hh}:${mm}:${ss}`
            var parts = auction.timeEnd.split(':');
            var minutes = parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
            var m = date.getMinutes() * 60 + date.getHours() * 60 * 60 + date.getSeconds();

            if (minutes <= m) {
                data = [];
            }
            var obj = {
                "userId": u.id,
                "userName": u.fullName,
                "price": price,
                "date": dateText
            };
            data.unshift(obj);

            io.sockets.emit("SendToClient", data);
        });

        socket.on("SendData", (idBan) => {
            if (idBanner !== idBan) {
                data = [];
            }
            io.sockets.emit("SendClient", data);
        });
    });
}

module.exports = {
    getSocket: getSocket,
}