import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import { SafeAreaView } from "react-native-safe-area-context"
import { UserProps } from '../types/user.t';
import { colors, theme } from '../themes/Theme';
import { PixProps } from '../types/pix.t';
import { Feather } from '@expo/vector-icons';
import { formatDate, formatDateShort, formatMoney } from '../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../contexts/AppContext';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get("screen");

export const PixScreen = ({ navigation }) => {

    const { idPix } = useContext(AppContext);

    const [load, isLoad] = useState<boolean>(false);
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [listPix, setListPix] = useState<PixProps[]>([] as PixProps[]);
    const [chartData, setChartData] = useState<PixProps[]>([] as PixProps[]);

    const getUser = async (id: number) => {

        const { status, data } = await axios.get('/users');
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

            const resSent = await axios.get(`/pix/${id}/sent`);
            if (resSent.status === 200) {
                if (resSent.data.length > 0) {
                    listSent = resSent.data;
                }
            }

            const resReceived = await axios.get(`/pix/${id}/received`);
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
                    saldo += (item.recipientId == idPix ? item.value : -item.value);
                    return {
                        ...item, balance: saldo, date: formatDateShort(item.createdAt)
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
            const { status, data } = await axios.post('/pix/',
                {
                    "senderId": idPix,
                    "recipientId": 9,
                    "value": 33.10
                }
            );

            console.log('STATUS_SEND=>', status);
            if (status === 200) {
                getListPix(idPix);
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
        getUser(idPix); //informe aqui o seu usuário
        getListPix(idPix);
    }, []);

    const ItemPix = ({ item }) => (
        <View style={theme.itemCard}>
            <View style={{ flex: 0.65 }}>
                <Text style={theme.fontLight}>{formatDate(item.createdAt)}</Text>
                <Text style={theme.fontRegular}>
                    {item.recipientId == idPix ? item.sender.name : item.recipient.name}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row', flex: 0.3,
                justifyContent: 'flex-end'
            }}>
                <Feather
                    name={item.recipientId == idPix ? "chevron-up" : "chevron-down"}
                    size={28}
                    color={item.recipientId == idPix ? colors.received : colors.sent} />
                <Text
                    style={[styles.itemPix, { color: item.recipientId == idPix ? colors.received : colors.sent }]}>
                    {formatMoney(item.value)}
                </Text>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <Animatable.View
                animation='fadeInDown'
                style={[theme.header, styles.headerPix]}>
                <View>
                    <Text style={theme.subtitle}>Olá</Text>
                    <Text style={theme.title}>{user.name}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.buttonPix}
                        onPress={() => {
                            navigation.navigate('SendPixScreen');
                        }
                        }
                    >
                        <Text style={[theme.fontRegular, styles.textButtonPix]}>Enviar PIX</Text>
                        <Feather name="send" size={26} color="#FFF" />
                    </TouchableOpacity>
                    <View style={{ marginRight: 16 }}>
                        <Text style={theme.title}>{getSaldo()}</Text>
                        <Text style={theme.subtitle}>Saldo</Text>
                    </View>
                </View>

            </Animatable.View>

            <VictoryChart
                minDomain={{ y: 0 }}
                width={width} height={200}
                theme={VictoryTheme.material}>
                <VictoryBar
                    data={chartData}
                    x="date"
                    y="balance" />
            </VictoryChart>

            <FlatList
                onRefresh={() => getListPix(idPix)}
                refreshing={load}
                data={listPix}
                renderItem={ItemPix}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    buttonPix: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#FFF',
        borderWidth: 1,
        padding: 8
    },
    button: {
        backgroundColor: colors.received,
        borderRadius: 16,
        height: 80,
        padding: 16,
        width: 200
    },
    headerPix: {
        justifyContent: 'space-between',
        paddingBottom: 16
    },
    itemPix: {
        color: colors.text,
        fontSize: 20,
        alignItems: 'flex-end',
        fontFamily: 'Exo2Regular'
    },
    textButtonPix: {
        marginRight: 8,
        fontSize: 22,
        color: '#FFF'
    }
});