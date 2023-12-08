import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Picker } from '@react-native-picker/picker';

export const SendPixScreen = ({ navigation }) => {

    const { user, balance, listUsers, users } = useContext(AppContext);
    const [recipientId, setRecipientId] = useState();

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

            <Picker
                selectedValue={recipientId}
                onValueChange={(itemValue, itemIndex) =>
                    setRecipientId(itemValue)
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

        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    }
})