import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CepProps } from '../types/cep.t';

export const CepScreen = () => {

    const [cep, setCep] = useState<CepProps>({
        cep: "",
        bairro: ""
    } as CepProps);

    const getCep = async () => {
        try {
            // axios.get('https://viacep.com.br/ws/95906634/json/')
            // .then(res => {
            //     console.log(res.data);
            // })
            const { data } = await axios.get('https://viacep.com.br/ws/95906634/json/');
            //console.log(data);
            setCep(data);

            


        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCep();
    });

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bairro: {cep.bairro}</Text>
    </View>);
}