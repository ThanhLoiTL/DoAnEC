import socketController from '../controllers/socketController';
import {
    format
} from 'date-fns'

let initSocket = async (io) => {
    socketController.getSocket(io);

    socketController.getEventDate();
}

module.exports = initSocket;