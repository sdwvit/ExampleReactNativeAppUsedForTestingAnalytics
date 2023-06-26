import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ShoppingCart, {CartItem} from './ShoppingCart';
import {styles} from './App.styles';
import {ErrorBoundary, NoibuJS} from 'noibu-react-native';
import InputView from './InputsView';

interface Item {
  id: number;
  name: string;
  price: number;
}

export default function App() {
  const [items] = useState<Item[]>([
    {id: 1, name: 'Product 1', price: 10},
    {id: 2, name: 'Product 2', price: 20},
    {id: 3, name: 'Product 3', price: 30},
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [u, setU] = useState(0);
  const update = () => setU(u + 1);
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

  const triggerHelpCodeAlert = useCallback(async () => {
    const response = await NoibuJS.requestHelpCode();
    if (response) {
      Alert.alert('Help Code delivered:', response);
    }
  }, []);

  const calculateItemsInCart = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ErrorBoundary
      fallback={() => (
        <View>
          <Text>Oh no!</Text>
        </View>
      )}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={{zIndex: 100}}>
          <SafeAreaView style={styles.container}>
            <ScrollView>
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
                  onPress={triggerHelpCodeAlert}>
                  <Text style={styles.whiteText}>
                    Flush all events to metroplex and request a help code
                  </Text>
                </TouchableOpacity>
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
              <View style={styles.itemsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                      .then(r => r.text())
                      .then(text => {
                        console.log(
                          `fetched ${text.length} or so bytes of html`,
                        );
                      });
                    setTimeout(
                      () =>
                        Promise.reject(new Error('standard promise rejection')),
                      500,
                    );
                  }}
                  style={styles.buyButton}>
                  <Text style={styles.whiteText}>
                    simulate an http call and an async promise rejection
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    update();
                  }}
                  style={styles.buyButton}>
                  <Text style={styles.whiteText}>Force update view</Text>
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
              <View style={styles.itemsContainer}>
                <InputView />
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
}
