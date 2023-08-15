import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 10,
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 10,
    marginBottom: 10,
  },
  cartItemName: {
    flex: 1,
    marginRight: 10,
  },
  cartItemPrice: {
    width: 60,
    textAlign: 'right',
  },
  cartItemQuantity: {
    width: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#FF6464',
    borderRadius: 50,
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalPrice: {
    fontWeight: 'bold',
  },
});
