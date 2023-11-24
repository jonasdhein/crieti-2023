import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { theme } from '../themes/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export const StorageScreen = () => {

    const [texto, setTexto] = useState<string>('');

    const salvarTexto = async (value: string) => {
        //setTexto('Trabalhando com Storage');
        await AsyncStorage.setItem('texto', value);
    }

    const buscarTexto = async () => {
        const value = await AsyncStorage.getItem('texto');
        setTexto(value);
    }

    useEffect(() => {
        console.log('chamou o useEffect');
        buscarTexto();
    }, [])

    return (
        <SafeAreaView style={theme.container}>
            <StatusBar style='light'
                translucent={false}
                backgroundColor='#7E57C2'
            />

            <Text>Texto salvo:</Text>
            <TouchableOpacity
                style={theme.button}
                onPress={() => salvarTexto('Trabalhando com Storage')}>
                <Text>Salvar</Text>
            </TouchableOpacity>
            <Text style={theme.textInput}>{texto}</Text>
        </SafeAreaView>
    )

}