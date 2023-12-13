import { useState } from 'react';
import { Alert, View } from 'react-native';
import LoginScreen from 'react-native-login-screen';
import { postlogin } from '../services/pix.service';

export const LoginAppScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    if(username == undefined || username.length <= 0) {
      Alert.alert('Usuário inválido');
      return;
    }

    if(password == undefined || password.length <= 0) {
      Alert.alert('Senha inválida');
      return;
    }

    const payload = { "email": username, "senha": password };

    const response = await postlogin(payload);
    if(response?.token){
      console.log('LOGIN COM SUCESSO!!!!!');
      navigation.reset({
        index: 0, routes: [{ name: 'DrawerRoutes' }]
      });
    }

  }

  return (
    <LoginScreen
      logoImageSource={require('../../assets/icon.png')}
      onLoginPress={() => handleLogin()}
      onEmailChange={setUsername}
      onPasswordChange={setPassword}
      onSignupPress={() => console.log('Cadastro desabilitado')}
      enablePasswordValidation
      disableSignup
      disableSocialButtons
      disableDivider
    />
  );
}
