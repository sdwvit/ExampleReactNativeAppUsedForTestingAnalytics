import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ShoppingCart, {CartItem} from './ShoppingCart';
import {styles} from './App.styles';
import 'noibu-js/noibujs-dev';
import {ErrorBoundary} from 'noibu-react';
setTimeout(() => {
  new Promise((resolve, reject) => {
    reject(new Error('standard promise rejection'));
  });
}, 5000);
interface Item {
  id: number;
  name: string;
  price: number;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([
    {id: 1, name: 'Product 1', price: 10},
    {id: 2, name: 'Product 2', price: 20},
    {id: 3, name: 'Product 3', price: 30},
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const handleBuy = (id: number) => {
    const selectedItem = items.find(item => item.id === id);
    if (selectedItem) {
      const existingCartItem = cartItems.find(item => item.id === id);
      if (existingCartItem) {
        const updatedCartItems = cartItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, {...selectedItem, quantity: 1}]);
      }
    }
  };

  const handleRemoveFromCart = (id: number) => {
    const updatedCartItems = cartItems
      .map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      })
      .filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateItemsInCart = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ErrorBoundary
      fallback={() => (
        <View>
          <Text>Oh no!</Text>
        </View>
      )}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{zIndex: 100}}
          onPress={e =>
            console.log('Touch happened', {
              x: e.nativeEvent.locationX,
              y: e.nativeEvent.locationY,
            })
          }>
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome to My Store</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCart(true);
                }}
                style={styles.cartButton}>
                <Text style={styles.cartButtonText}>
                  🛒 {calculateItemsInCart()} items
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
              {items.map(item => (
                <View key={item.id} style={styles.item}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <TouchableOpacity
                    onPress={() => handleBuy(item.id)}
                    style={styles.buyButton}>
                    <Text style={styles.whiteText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.itemsContainer}>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => window.NOIBUJS.requestHelpCode()}>
                <Text style={styles.whiteText}>
                  Flush all events to metroplex
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
              <Text style={{fontSize: 15}}>
                HermesInternal.hasPromise():{' '}
                {globalThis.HermesInternal.hasPromise() && 'true'}
              </Text>
            </View>

            <View style={styles.itemsContainer}>
              <TouchableOpacity
                onPress={() => {
                  throw new Error('simulated react error');
                }}
                style={styles.buyButton}>
                <Text style={styles.whiteText}>simulate react error</Text>
              </TouchableOpacity>
            </View>
            {showCart && (
              <ShoppingCart
                cartItems={cartItems}
                handleRemoveFromCart={handleRemoveFromCart}
                calculateTotal={calculateTotal}
                onClose={() => setShowCart(false)}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ErrorBoundary>
  );
}
