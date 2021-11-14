import socketController from '../controllers/socketController';

let initSocket = (io) => {
    socketController.getSocket(io);
    socketController.getSocket1(io);
}

module.exports = initSocket;