import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ShoppingCart.styles';
import { Navigation } from 'react-native-navigation';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  cartItems: Record<CartItem['id'], CartItem>;
  handleRemoveFromCart: () => void;
  componentId?: string;
}

export default function ShoppingCart(props: Props) {
  const { cartItems, handleRemoveFromCart, componentId } = props;
  const [items, setItems] = useState<typeof cartItems>(cartItems);

  return (
    <View style={styles.container}>
      {Object.values(items || {}).length > 0 ? (
        <>
          {Object.values(items).map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${item.price}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setItems(items => {
                      if (items[item.id].quantity === 1) {
                        delete items[item.id];
                      } else {
                        items[item.id].quantity -= 1;
                      }
                      return { ...items };
                    });
                    handleRemoveFromCart();
                  }}
                  style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>
              $
              {Object.values(items)
                .reduce((mem, item) => mem + item.quantity * item.price, 0)
                .toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Navigation.push(componentId!, {
                component: {
                  name: 'InnerView',
                },
              })
            }>
            <Text>Go to inner view</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </View>
  );
}
