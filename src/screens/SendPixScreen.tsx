import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Picker } from '@react-native-picker/picker';
import { SendProps } from "../types/send.t";
import { formatMoney } from "../utils/utils";
import { sendPix } from "../services/pix.service";

export const SendPixScreen = ({ navigation }) => {

    const { user, balance, listUsers, users } = useContext(AppContext);

    const [sender, setSender] = useState<SendProps>({} as SendProps);

    useEffect(() => {
        listUsers();
    }, []);

    const handleSend = async () => {
        try{

            if(sender.recipientId == undefined || sender.recipientId <= 0){
                Alert.alert('Destinatário Inválido');
                return;
            }

            if(sender.value == undefined || sender.value <= 0){
                Alert.alert('Informe um valor válido');
                return;
            }

            if(user.id <= 0){
                Alert.alert('Usuário não definido');
                return;
            }
            
            const payload:SendProps = {
                recipientId: sender.recipientId,
                value: sender.value,
                senderId: user.id
            }

            let retorno = await sendPix(payload);
            if(retorno){
                Alert.alert('Sucesso', 'PIX enviado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.goBack();
                            }
                        }
                    ]
                )
            }

        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <View style={theme.container}>

            <View style={theme.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={24} color='#FFF' />
                </TouchableOpacity>

                <View>
                    <Text style={theme.subtitle}>Olá</Text>
                    <Text style={theme.title}>{user.name}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <View style={{ marginRight: 16 }}>
                        <Text style={theme.title}>{formatMoney(balance)}</Text>
                        <Text style={theme.subtitle}>Saldo</Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={[theme.fontRegular, styles.label]}>Conta:</Text>
                <Picker
                    mode='dialog'
                    selectedValue={sender.recipientId}
                    onValueChange={(itemValue) =>
                        setSender({ ...sender, recipientId: itemValue })
                    }>
                        <Picker.Item key={-1} label="Selecione..." value={0} />
                    {
                        users.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.name} value={item.id} />
                            )
                        }
                        )
                    }
                </Picker>


                <View style={styles.body}>
                    <Text style={[theme.fontRegular, styles.label]}>Valor:</Text>
                    <TextInput
                        style={[styles.textInput, theme.fontRegular]}
                        keyboardType='numeric'
                        placeholder="Valor"
                        value={sender.value ? sender.value.toString() : ''}
                        onChangeText={value => setSender({ ...sender, value: value ? Number.parseFloat(value) : 0 })}
                    />

                </View>

                <View style={styles.body}>
                    <TouchableOpacity
                        style={styles.pixButton}
                        onPress={() => {
                            handleSend();
                        }
                        }
                    >
                        <Text style={[theme.fontBold, styles.pixTextInput]}>Enviar PIX</Text>
                        <Feather name="send" size={26} color="#FFF" />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pixButton: {
        backgroundColor: colors.primary,
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 8,
        paddingVertical: 8
    },
    label: {
        color: colors.primary,
        fontSize: 20
    },
    body: {
        paddingHorizontal: 16,
        marginTop: 8
    },
    textInput: {
        borderWidth: 1,
        color: colors.primary,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 8,
        height: 40,
        marginTop: 8,
        width: '100%'
    },
    pixTextInput: {
        color: '#FFF',
        fontSize: 20,
        padding: 8,
    }
})