import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    color: '#aaa',
  },
});

export default styles;