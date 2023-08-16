import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#FF6464',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    width: 60,
    textAlign: 'right',
  },
  buyButton: {
    backgroundColor: '#FF6464',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
