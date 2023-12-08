import axios from "axios";
import { SendProps } from "../types/send.t";

export const findUser = async (id: number) => {
    try {

        const { status, data } = await axios.get('/users');
        if (status === 200) {
            const user = data.find(item => item.id === id);
            if (user) {
                return user;
            }
        }

    } catch (err) {
        console.log('ERR_getUser=>', err.message);
        return null;
    }
}

export const getUsers = async () => {
    try {

        const { status, data } = await axios.get('/users');
        if (status === 200) {
            return data;
        }

    } catch (err) {
        console.log('ERR_getUser=>', err.message);
        return null;
    }
}

export const sendPix = async (payload: SendProps) => {
    try {
        const { status, data } = await axios.post('/pix/',
            payload
        );

        console.log('STATUS_SEND=>', status);
        if (status === 200) {
            return true;
        }

    } catch (err) {
        console.log('ERR_sendPix=>', err);
        return false;
    }
}