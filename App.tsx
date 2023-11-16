import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
const { width } = Dimensions.get('screen');

export default function App() {

  const [name, setName] = useState('Jonas Dhein');
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    name: "Jonas Dhein",
    age: 34,
    city: "Teutônia"
  });

  useEffect(() => {
    console.log("TELA RECARREGADA!!!, tamanho: ", width);
  })

  useEffect(() => {
    console.log("TELA CARREGADA!!!");
  }, [])

  useEffect(() => {
    console.log("Count alterado: ", count);
  }, [count])

  function somar() {
    setCount(prevState => prevState + 1);
  }

  const subtrair = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.view1}>
            <Text style={[styles.text, styles.margin]}>MEU APP</Text>

            <Text style={[styles.subtitle, styles.margin]}>Gols do Grêmio: {count}</Text>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => somar()}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => subtrair()}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.view2}>
            <Text>Name: {user.name}</Text>
            <Text>Age: {user.age}</Text>
            <Text>City: {user.city}</Text>

            <TouchableOpacity
              onPress={() => setUser({ ...user, age: user.age + 1 })}
              style={[styles.button, { width: 200 }]}>
              <Text style={styles.textButton}>Aniversário</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.view3}>
            <TextInput
              style={styles.textInput}
              placeholder='Nome'
              autoCapitalize='words'
              value={user.name}
              onChangeText={value => setUser({ ...user, name: value })}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Idade'
              keyboardType='numeric'
              value={user.age.toString()}
              onChangeText={value => setUser({ ...user, age: Number(value) })}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Cidade'
              value={user.city}
              onChangeText={value => setUser({ ...user, city: value })}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 12,
    margin: 8
  },
  containerButton: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  margin: {
    marginBottom: 4
  },
  subtitle: {
    color: '#3498DB',
    fontSize: 24,
  },
  text: {
    color: '#2C3E50',
    fontSize: 28,
    fontWeight: 'bold'
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 8,
    fontSize: 20,
    marginBottom: 8,
    padding: 8,
    width: width * 0.9,
    height: 48
  },
  view1: {
    justifyContent: 'center',
    marginBottom: 8
  },
  view2: {
    backgroundColor: 'center',
    marginBottom: 8
  },
  view3: {
    backgroundColor: 'center',
    marginBottom: 8
  }
});
