import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ShoppingCart, {CartItem} from './ShoppingCart';
import {styles} from './App.styles';
import {ErrorBoundary, NoibuJS, setupNoibu} from 'noibu-react-native';
import MetroplexSocket from 'noibu-react-native/dist/api/metroplexSocket';
import Storage from 'noibu-react-native/dist/storage/storage';
import * as Constants from 'noibu-react-native/dist/constants';
import InputView from './InputsView';
import pkg from '../package.json';

interface Item {
  id: number;
  name: string;
  price: number;
}
setupNoibu({
  domain: 'example_domain',
  enableHttpDataCollection: true,
  listOfUrlsToCollectHttpDataFrom: [
    'https://jsonplaceholder.typicode.com/todos/1',
  ],
});
NoibuJS.addCustomAttribute('app_version', pkg.version);

export default function App() {
  const [items] = useState<Item[]>([
    {id: 1, name: 'Product 1', price: 10},
    {id: 2, name: 'Product 2', price: 20},
  ]);
  const [sessionInfo, setSessionInfo] = useState<string | null>(null);
  const [storageSize, setStorageSize] = useState(0);
  const [isErrorComponentShown, setIsErrorComponentShown] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const getSessionInfo = () => {
    Storage.getInstance()
      .load<string>(Constants.NOIBU_BROWSER_ID_KYWRD)
      .then(setSessionInfo);
  };
  useEffect(getSessionInfo, []);
  useEffect(getSessionInfo, [storageSize]);

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

  const buttonActions = [
    {
      text: 'Flush all events to metroplex and request a help code',
      action: triggerHelpCodeAlert,
    },
    {
      text: 'Simulate closed socket',
      action: () => MetroplexSocket.getInstance().socket.close(1),
    },
    {
      action: () => console.log(new Error('simulated console logged error')),
      text: 'simulate console logged error',
    },
    {
      action: () => {
        throw new Error('simulated sync error');
      },
      text: 'simulate sync error',
    },
    {
      action: () => setIsErrorComponentShown(true),
      text: (
        <>
          simulate react error
          {isErrorComponentShown ? <div /> : null}
        </>
      ),
    },
    {
      action: () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
          .then(r => r.text())
          .then(text => {
            console.log(`fetched ${text.length} or so bytes of html`);
          });
        setTimeout(
          () => Promise.reject(new Error('standard promise rejection')),
          500,
        );
      },
      text: 'simulate an http call and an async promise rejection ',
    },
    {
      action: async () =>
        setStorageSize(await Storage.getInstance().calculateUsedSize()),
      text: <>Calculate storage used: {storageSize} bytes</>,
    },
  ];

  return (
    <ErrorBoundary
      fallback={() => (
        <SafeAreaView style={styles.container}>
          <Text>This is expected error, restart the app</Text>
        </SafeAreaView>
      )}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <View style={{marginLeft: 30}}>
              <Text>Session info:</Text>
              {Object.entries(JSON.parse(sessionInfo || '{}')).map(entry => (
                <View key={entry[0]}>
                  <Text>
                    <>
                      * <Text style={{fontWeight: 'bold'}}>{entry[0]}</Text>:{' '}
                      {`${entry[1]}`}
                    </>
                  </Text>
                </View>
              ))}
            </View>
            {buttonActions.map((el, i) => (
              <View style={styles.itemsContainer} key={i}>
                <TouchableOpacity style={styles.buyButton} onPress={el.action}>
                  <Text style={styles.whiteText}>{el.text}</Text>
                </TouchableOpacity>
              </View>
            ))}
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
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
}
