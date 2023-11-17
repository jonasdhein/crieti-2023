import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const theme = StyleSheet.create({
    button: {
      width: 100,
      height: 48,
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
      color: '#000',
      fontSize: 24,
    },
    title: {
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