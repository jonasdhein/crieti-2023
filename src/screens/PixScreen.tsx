import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import { SafeAreaView } from "react-native-safe-area-context"
import { UserProps } from '../types/user.t';
import { colors, theme } from '../themes/Theme';
import { PixProps } from '../types/pix.t';
import { Feather } from '@expo/vector-icons';
import { formatDate, formatMoney } from '../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get("screen");

export const PixScreen = () => {

    const myId = 31; //código da sua conta
    const [load, isLoad] = useState<boolean>(false);
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [listPix, setListPix] = useState<PixProps[]>([] as PixProps[]);
    const [chartData, setChartData] = useState<PixProps[]>([] as PixProps[]);

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
            if (resSent.status === 200) {
                if (resSent.data.length > 0) {
                    listSent = resSent.data;
                }
            }

            const resReceived = await axios.get(`http://177.44.248.24/pix-api/pix/${id}/received`);
            if (resReceived.status === 200) {
                if (resReceived.data.length > 0) {
                    listReceived = resReceived.data;
                }
            }

            const newList = listSent.concat(listReceived).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

            let saldo = 0;
            const newListChart = listSent
                .concat(listReceived)
                .sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)
                .map((item) => {
                    saldo += (item.recipientId == myId ? item.value : -item.value);
                    return {
                        ...item, balance: saldo
                    }
                });


            setChartData(newListChart);
            setListPix(newList);
            isLoad(false);

        } catch (err) {
            isLoad(false);
            console.log('ERROR', err);
        }
    }

    const sendPix = async () => {
        try {
            const { status, data } = await axios.post('http://177.44.248.24/pix-api/pix/',
                {
                    "senderId": myId,
                    "recipientId": 9,
                    "value": 33.10
                }
            );

            console.log('STATUS_SEND=>', status);
            if (status === 200) {
                getListPix(myId);
            }
        } catch (err) {
            console.log('ERROR=>', err);
        }
    }

    const getSaldo = () => {
        if (chartData.length > 0) {
            return formatMoney(chartData[chartData.length - 1].balance);
        } else {
            return formatMoney(0);
        }
    }

    useEffect(() => {
        getUser(myId); //informe aqui o seu usuário
        getListPix(myId);
    }, []);

    const ItemPix = ({ item }) => (
        <View style={theme.itemCard}>
            <View>
                <Text>{formatDate(item.createdAt)}</Text>
                <Text>{item.recipientId == myId ? item.sender.name : item.recipient.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Feather
                    name={item.recipientId == myId ? "chevron-up" : "chevron-down"}
                    size={28}
                    color={item.recipientId == myId ? colors.received : colors.sent} />
                <Text
                    style={[styles.itemPix, { color: item.recipientId == myId ? colors.received : colors.sent }]}>
                    {formatMoney(item.value)}
                </Text>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <View
                style={[theme.header, { justifyContent: 'space-between', height: 180 }]}>
                <View>
                    <Text style={theme.subtitle}>Olá</Text>
                    <Text style={theme.title}>{user.name}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 16 }}>
                    <Text style={theme.title}>{getSaldo()}</Text>
                    <Text style={theme.subtitle}>Saldo</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Confirmação', 'Deseja mesmo enviar um PIX?',
                        [
                            {
                                text: 'SIM',
                                onPress: () => sendPix()
                            },
                            {
                                text: 'NÃO'
                            }
                        ])
                }}
                style={styles.button}>
                <Text style={theme.subtitle}>Enviar PIX de Teste</Text>
            </TouchableOpacity>

            <VictoryChart
                minDomain={{ y: 0 }}
                width={width} height={200}
                theme={VictoryTheme.material}>
                <VictoryLine
                    animate={{
                        easing: 'bounce'
                    }}
                    interpolation='natural'
                    data={chartData}
                    x="createdAt"
                    y="balance" />
                <VictoryAxis
                    theme={VictoryTheme.material}
                    axisLabelComponent={<VictoryLabel dy={20} />}
                    label="Evolução do Saldo"
                    style={{
                        tickLabels: { fill: "transparent" }
                    }} />
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
    button: {
        backgroundColor: colors.received,
        borderRadius: 16,
        height: 80,
        padding: 16,
        width: 200
    },
    itemPix: {
        color: colors.text,
        fontSize: 20,
        alignItems: 'flex-end',
        fontFamily: 'Exo2Regular'
    }
});