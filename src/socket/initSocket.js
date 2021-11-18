import socketController from '../controllers/socketController';

let initSocket = (io) => {
    socketController.getSocket(io);
}

module.exports = initSocket;