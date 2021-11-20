import socketService from '../services/socketService';
import userService from '../services/userService';
var clock = require('date-events')()
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

let getEventDate = () => {
    //let date = Date.now();
    //let d = format(date, 'yyyy-MM-dd HH:mm:ss');
    //console.log(d);
    clock.on('*:*', async function (date) {
        let auctionL = await socketService.getListAuction(0);
        let auctioning = await socketService.getListAuction(1);
        if (auctionL.length > 0) {
            let d = new Date(auctionL[0].timeStart);
            if (d.getHours() === date.getHours() && d.getMinutes() === date.getMinutes()) {
                // console.log(d.getYear());
                // console.log(d.getMonth());
                // console.log(d.getDate());
                console.log(d.getHours());
                console.log(d.getMinutes());
                socketService.setStatusAuction(auctionL[0].id, 1);
            }
        }
        if (auctioning.length > 0) {
            let dEnd = new Date(auctioning[0].timeEnd);
            if (dEnd.getHours() === date.getHours() && dEnd.getMinutes() === date.getMinutes()) {
                // console.log(d.getYear());
                // console.log(d.getMonth());
                // console.log(d.getDate());
                console.log(dEnd.getHours());
                console.log(dEnd.getMinutes());
                socketService.setStatusAuction(auctioning[0].id, 2);
            }
        }
        //clock.removeAllListeners()
    })
}

module.exports = {
    getSocket: getSocket,
    getEventDate: getEventDate
}