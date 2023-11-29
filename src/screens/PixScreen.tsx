import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserProps } from '../types/user.t';

export const PixScreen = () => {

    const [user, setUser] = useState<UserProps>();

    const getUser = async (id: number) => {

        const { status, data } = await axios.get('http://177.44.248.24/pix-api/users');
        if (status === 200) {
            const user = data.filter(item => item.id === id);
            if (user.length > 0) {
                console.log('MY USER', user[0]);
            }
        }

    }

    useEffect(() => {
        getUser(28);
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>{user.name}</Text>
        </SafeAreaView>
    )
}