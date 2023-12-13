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
        } else {
            return [];
        }

    } catch (err) {
        console.log('ERR_getUser=>', err.message);
        return null;
    }
}

export const getSent = async (id: number) => {
    try {

        const { status, data } = await axios.get(`/pix/${id}/sent`);
        if (status === 200) {
            return data;
        }else{
            return [];
        }

    } catch (err) {
        console.log('ERR_getSent=>', err.message);
        return [];
    }
}

export const getReceived = async (id: number) => {
    try {

        const { status, data } = await axios.get(`/pix/${id}/received`);
        if (status === 200) {
            return data;
        }else{
            return [];
        }

    } catch (err) {
        console.log('ERR_getReceived=>', err.message);
        return [];
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
        }else{
            return false;
        }

    } catch (err) {
        console.log('ERR_sendPix=>', err);
        return false;
    }
}