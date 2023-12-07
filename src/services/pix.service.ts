import axios from "axios";

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