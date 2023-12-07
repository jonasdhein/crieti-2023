import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CepProps } from '../types/cep.t';
import { colors, theme } from '../themes/Theme';

export const CepScreen = ({ navigation }) => {

    console.log('API=>', process.env.EXPO_PUBLIC_API_KEY);

    const [input, setInput] = useState<string>('');
    const [cep, setCep] = useState<CepProps>({} as CepProps);

    const getCep = async () => {
        try {
            // axios.get('https://viacep.com.br/ws/95906634/json/')
            // .then(res => {
            //     console.log(res.data);
            // })
            const { data, status } = await axios.get(`https://viacep.com.br/ws/${input}/json/`);
            if (status == 200) {
                setCep(data);
            } else {
                Alert.alert('Atenção', 'O CEP informado não foi localizado');
            }

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (input.length == 8) {
            getCep();
        }
    }, [input]);

    return (
        <View style={theme.container}>
            <View style={[theme.header, styles.header]}>
                <Text style={[styles.label, theme.fontRegular]}>CEP</Text>
                <TextInput
                    style={[styles.textInput, theme.fontRegular]}
                    keyboardType='numeric'
                    maxLength={8}
                    value={input}
                    onChangeText={setInput}
                />
            </View>
            <View style={styles.body}>
                <Text style={theme.primarySubtitle}>UF: {cep.uf}</Text>
                <Text style={theme.primarySubtitle}>Localidade: {cep.localidade}</Text>
                <Text style={theme.primarySubtitle}>Bairro: {cep.bairro}</Text>
                <Text style={theme.primarySubtitle}>{cep.logradouro}</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('MapScreen', { lat: -29.90, lon: -52.66 })}
                    style={theme.primaryButton}>
                    <Text style={{ color: '#FFF' }}>ABRIR MAPA</Text>
                </TouchableOpacity>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    body: {
        padding: 16
    },
    header: {
        paddingHorizontal: 16,
    },
    label: {
        marginTop: 22,
        color: '#FFF',
        fontSize: 20,
        marginBottom: 8
    },
    textInput: {
        borderWidth: 1,
        color: '#FFF',
        borderColor: '#FFF',
        borderRadius: 8,
        padding: 8,
        height: 40,
        width: '100%'
    }
});