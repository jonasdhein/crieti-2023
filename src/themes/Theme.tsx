import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const theme = StyleSheet.create({
    button: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      borderRadius: 12,
      backgroundColor: '#f5f5f5',
      marginVertical: 16,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: 48,
    },
    itemCard: {
      backgroundColor: '#ECF0F1',
      borderRadius: 8,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
      marginHorizontal: 16
    },
    list: {
      marginTop: -22,
      width: '100%'
    },
    containerButton: {
      flexDirection: 'row'
    },
    container: {
      flex: 1
    },
    header: {
      backgroundColor: '#7E57C2',
      paddingTop: 44,
      height: 210,
      padding: 8,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32
    },
    margin: {
      marginBottom: 8
    },
    itemTask: {
      color: '#2C3E50',
      fontSize: 20,
      fontFamily: 'Exo2Regular'
    },
    itemTaskChecked: { 
      textDecorationLine: 'line-through',
      opacity: 0.5
    },
    subtitle: {
      color: '#FFF',
      fontSize: 20,
    },
    title: {
      color: '#FFF',
      fontSize: 28,
      fontWeight: 'bold'
    },
    textButton: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textInput: {
      fontSize: 20,
      padding: 8,
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