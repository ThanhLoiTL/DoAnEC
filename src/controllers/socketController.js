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

            const date3 = new Date();
            const yyyy = date3.getFullYear();
            const mmm = date3.getMonth();
            const dd = date3.getDate();
            const hh = date3.getHours();
            const mm = date3.getMinutes();
            const ss = date3.getSeconds();
            const dateText = `${dd}-${mmm + 1}-${yyyy} +vào lúc ${hh}:${mm}:${ss}`;

            var timeEnd = new Date(auction.timeEnd);
            var dateNow = Date.now();

            if (dateNow > timeEnd) {
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
        let auction;
        let timeAuction;
        let time1
        let result;
        let auctioning = await socketService.getListAuction(1);
        if (auctionL.length > 0) {
            timeAuction = new Date(auctionL[0].timeStart);
            auction = auctionL[0];
            for (let i = 1; i < auctionL.length; i++) {
                result = timeAuction - date;
                time1 = new Date(auctionL[i].timeStart);
                if (result > (time1 - date)) {
                    timeAuction = new Date(auctionL[i].timeStart);
                    auction = auctionL[i];
                }
            }
            if (timeAuction.getFullYear() === date.getFullYear() && (timeAuction.getMonth()) === date.getMonth() &&
                timeAuction.getDate() === date.getDate() && timeAuction.getHours() === date.getHours() &&
                timeAuction.getMinutes() === date.getMinutes()) {
                socketService.setStatusAuction(auction.id, 1, 1);
            }
        }
        if (auctioning.length > 0) {
            timeAuction = new Date(auctioning[0].timeEnd);
            auction = auctioning[0];
            for (let i = 1; i < auctioning.length; i++) {
                result = timeAuction - date;
                time1 = new Date(auctionL[i].timeEnd);
                if (result > (time1 - date)) {
                    timeAuction = new Date(auctionL[i].timeEnd);
                    auction = auctioning[i];
                }
            }
            if (timeAuction.getFullYear() === date.getFullYear() && (timeAuction.getMonth()) === date.getMonth() &&
                timeAuction.getDate() === date.getDate() && timeAuction.getHours() === date.getHours() &&
                timeAuction.getMinutes() === timeAuction.getMinutes()) {
                socketService.setStatusAuction(auction.id, 2, 0);
            }
        }
        //clock.removeAllListeners()
    })
}

module.exports = {
    getSocket: getSocket,
    getEventDate: getEventDate
}