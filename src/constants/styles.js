import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    marginTop:40
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTab: {
    color: colors.primary,
  },
  inactiveTab: {
    color: colors.gray,
  },
  fabButton: {
    backgroundColor: '#6c5ce7',
    padding: 2,
    borderRadius: 30,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});