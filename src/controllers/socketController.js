import socketService from '../services/socketService';
import userService from '../services/userService';
// var data = '{"results":[]}';
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
            var date2 = new Date().toString().
            replace(/T/, ' '). // replace T with a space
            replace(/\..+/, '');
            const date3 = new Date();
            const yyyy = date3.getFullYear();
            const mmm = date3.getMonth();
            const dd = date3.getDate();
            const hh = date3.getHours();
            const mm = date3.getMinutes();
            const ss = date3.getSeconds();
            const dateText = `${dd}-${mmm + 1}-${yyyy} vào lúc ${hh}:${mm}:${ss}`
            var parts = auction.timeEnd.split(':');
            var minutes = parts[0] * 60 * 60 + parts[1] * 60;
            var m = date.getMinutes() * 60 + date.getHours() * 60 * 60;

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
            io.sockets.emit("SendToClient", data);
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