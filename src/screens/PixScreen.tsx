import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme } from 'victory-native';
import { SafeAreaView } from "react-native-safe-area-context"
import { UserProps } from '../types/user.t';
import { colors, theme } from '../themes/Theme';
import { PixProps } from '../types/pix.t';
import { Feather } from '@expo/vector-icons';

export const PixScreen = () => {

    const myId = 28;
    const [load, isLoad] = useState<boolean>(false);
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [listPix, setListPix] = useState<PixProps[]>([] as PixProps[]);

    const getUser = async (id: number) => {

        const { status, data } = await axios.get('http://177.44.248.24/pix-api/users');
        if (status === 200) {
            const user = data.filter(item => item.id === id);
            if (user.length > 0) {
                setUser(user[0]);
            }
        }
    }

    const getListPix = async (id: number) => {
        try {
            isLoad(true);
            let listSent = [];
            let listReceived = [];

            const resSent = await axios.get(`http://177.44.248.24/pix-api/pix/${id}/sent`);
            console.log('resSent', resSent.status);
            if (resSent.status === 200) {
                if (resSent.data.length > 0) {
                    listSent = resSent.data;
                }
            }

            const resReceived = await axios.get(`http://177.44.248.24/pix-api/pix/${id}/received`);
            console.log('resReceived', resReceived.status);
            if (resReceived.status === 200) {
                if (resReceived.data.length > 0) {
                    listReceived = resReceived.data;
                }
            }

            setListPix(listSent.concat(listReceived));
            isLoad(false);

        } catch (err) {
            isLoad(false);
            console.log('ERROR', err);
        }
    }

    useEffect(() => {
        getUser(myId); //informe aqui o seu usuário
        getListPix(myId);
    }, []);

    const ItemPix = ({ item }) => (
        <View style={theme.itemCard}>
            <Feather
                name={item.recipientId == myId ? "chevron-up" : "chevron-down"}
                size={28}
                color={item.recipientId == myId ? colors.received : colors.sent} />
            <Text
                style={[styles.itemPix, { color: item.recipientId == myId ? colors.received : colors.sent }]}>
                {formatMoney(item.value)}
            </Text>
        </View>
    )

    const formatMoney = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    const data = [
        { mes: 1, valor: 13000 },
        { mes: 2, valor: 16500 },
        { mes: 3, valor: 14250 },
        { mes: 4, valor: 19000 }
      ];
      

    return (
        <View style={{ flex: 1 }}>
            <View
                style={[theme.header, { justifyContent: 'space-between' }]}>
                <View>
                    <Text style={theme.subtitle}>Olá</Text>
                    <Text style={theme.title}>{user.name}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 16 }}>
                    <Text style={theme.title}>R$ 100,00</Text>
                    <Text style={theme.subtitle}>Saldo</Text>
                </View>
            </View>

            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar
                animate={true} data={listPix} x="createdAt" y="value" />
            </VictoryChart>

            <FlatList
                onRefresh={() => getListPix(myId)}
                refreshing={load}
                data={listPix}
                renderItem={ItemPix}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    itemPix: {
        color: colors.text,
        fontSize: 20,
        alignItems: 'flex-end',
        fontFamily: 'Exo2Regular'
    }
});