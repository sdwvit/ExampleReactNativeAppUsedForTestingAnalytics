import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './ShoppingCart.styles';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  cartItems: CartItem[];
  handleRemoveFromCart: (id: number) => void;
  calculateTotal: () => number;
  onClose: () => void;
}

export default function ShoppingCart(props: Props) {
  const {cartItems, handleRemoveFromCart, calculateTotal, onClose} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>❌</Text>
      </TouchableOpacity>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${item.price}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item.id)}
                  style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </View>
  );
}
