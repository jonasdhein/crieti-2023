import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Picker } from '@react-native-picker/picker';
import { SendProps } from "../types/send.t";

export const SendPixScreen = ({ navigation }) => {

    const { user, balance, listUsers, users } = useContext(AppContext);

    const [sender, setSender] = useState<SendProps>({} as SendProps);

    useEffect(() => {
        listUsers();
    }, []);

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
            </View>

            <View style={styles.body}>
                <Text style={[theme.fontRegular, styles.label]}>Conta:</Text>
                <Picker
                    mode='dialog'
                    selectedValue={sender.recipientId}
                    onValueChange={(itemValue) =>
                        setSender({ ...sender, recipientId: itemValue })
                    }>
                    {
                        users.map((item) => {
                            return (
                                <Picker.Item label={item.name} value={item.id} />
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
    label: {
        color: '#000',
        fontSize: 20
    },
    body: {
        paddingHorizontal: 16,
        marginTop: 8
    },
    textInput: {
        borderWidth: 1,
        color: '#FFF',
        borderColor: '#FFF',
        borderRadius: 8,
        padding: 8,
        height: 40,
        marginTop: 8,
        width: '100%'
    }
})