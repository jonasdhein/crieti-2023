import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const SendPixScreen = ({ navigation }) => {

    const { user } = useContext(AppContext);

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