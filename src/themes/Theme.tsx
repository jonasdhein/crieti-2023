import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const colors = {
  text: '#2C3E50',
  sent: '#C0392B',
  received: '#27AE60',
}

export const theme = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    height: 48,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
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
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
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
    fontFamily: 'Exo2Regular'
  },
  primarySubtitle: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Exo2Regular'
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'Exo2Bold'
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    fontSize: 20,
    padding: 8,
    height: 48,
    fontFamily: 'Exo2Regular'
  },
  fontRegular: {
    fontSize: 18,
    fontFamily: 'Exo2Regular'
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