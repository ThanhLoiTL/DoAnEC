import socketService from '../services/socketService';
import userService from '../services/userService';
var clock = require('date-events')()
const datedate = require('date-and-time')
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

        // socket.on("PostWinAuction", async (data) => {
        //     if (!data) {
        //         return res.status(500).json({
        //             message: 'Missing value'
        //         });
        //     }
        //     console.log(data);
        //     let message = await auctionService.postWinAuction(data);
        //     //return res.status(200).json(message);
        // });
    });
}

let getEventDate = () => {
    //let date = Date.now();
    //let d = format(date, 'yyyy-MM-dd HH:mm:ss');
    //console.log(d);
    clock.on('*:*', async function (date) {
        let auctionList = await socketService.getListAuction(0);
        let auction;
        let timeAuction;
        let time1;
        let result;

        let auctioning = await socketService.getListAuction(1);
        if (auctionList.length > 0) {
            timeAuction = new Date(auctionList[0].timeStart);
            auction = auctionList[0];
            for (let i = 1; i < auctionList.length; i++) {
                result = timeAuction - date;
                time1 = new Date(auctionList[i].timeStart);
                if (result > (time1 - date)) {
                    timeAuction = new Date(auctionList[i].timeStart);
                    auction = auctionList[i];
                }
            }
            if (timeAuction.getFullYear() == date.getFullYear() && (timeAuction.getMonth()) == date.getMonth() &&
                timeAuction.getDate() == date.getDate() && timeAuction.getHours() == date.getHours() &&
                timeAuction.getMinutes() == date.getMinutes()) {
                socketService.setStatusAuction(auction.id, 1, 1);
            }
        }

        if (auctioning.length > 0) {
            timeAuction = new Date(auctioning[0].timeEnd);
            // console.log(timeAuction.getTime());
            // console.log(date.getTime());
            auction = auctioning[0];
            for (let i = 1; i < auctioning.length; i++) {
                result = timeAuction - date;
                time1 = new Date(auctioning[i].timeEnd);
                if (result > (time1 - date)) {
                    timeAuction = new Date(auctioning[i].timeEnd);
                    auction = auctioning[i];
                }
            }
            if (timeAuction.getFullYear() == date.getFullYear() && (timeAuction.getMonth()) == date.getMonth() &&
                timeAuction.getDate() == date.getDate() && timeAuction.getHours() == date.getHours() &&
                timeAuction.getMinutes() == date.getMinutes()) {
                socketService.setStatusAuction(auction.id, 2, 0);
            }
        }
    })
}

module.exports = {
    getSocket: getSocket,
    getEventDate: getEventDate
}