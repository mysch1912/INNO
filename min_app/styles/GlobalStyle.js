import { StyleSheet } from 'react-native';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#2f6b4f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#dfe9e3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButtonText: {
    color: '#2f6b4f',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
  },

  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
});