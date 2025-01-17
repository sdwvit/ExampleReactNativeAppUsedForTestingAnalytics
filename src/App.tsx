import React, { useEffect, useState } from 'react';
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
import { Navigation } from 'react-native-navigation';
import { ErrorBoundary, NoibuJS, setupNoibu } from 'noibu-react-native';
import MetroplexSocket from 'noibu-react-native/dist/api/MetroplexSocket';
import Storage from 'noibu-react-native/dist/storage/Storage';

import { styles } from './App.styles';
import InputView from './InputsView';
import pkg from '../package.json';
import { CartItem } from './ShoppingCart';

interface Item {
  id: number;
  name: string;
  price: number;
}

setupNoibu({
  domain: 'react-native-testing.noibu.com',
  enableHttpDataCollection: true,
  listOfUrlsToCollectHttpDataFrom: ['https://*'],
}).then(() => NoibuJS.addCustomAttribute('app_version', pkg.version));

export default function App({ componentId }: { componentId?: string }) {
  const [items] = useState<Record<Item['id'], Item>>({
    1: { id: 1, name: 'Product 1', price: 10 },
    2: { id: 2, name: 'Product 2', price: 20 },
  });
  const [cartItems, setCartItems] = useState<Record<Item['id'], CartItem>>([]);
  const [sessionInfo, setSessionInfo] = useState<string | null>(null);
  const [storageSize, setStorageSize] = useState(0);
  const [isErrorComponentShown, setIsErrorComponentShown] = useState(false);

  useEffect(() => {
    Storage.getInstance().load('n_browser_data').then(setSessionInfo);
  }, [storageSize]);

  const handleBuy = (id: number) => {
    setCartItems(cartItems => {
      cartItems[id] ||= { ...items[id], quantity: 0 };
      cartItems[id].quantity += 1;
      return { ...cartItems };
    });
  };

  const handleRemoveFromCart = () => {
    setCartItems(cartItems => ({ ...cartItems }));
  };

  const buttonActions = [
    {
      text: 'Flush all events to metroplex and request a help code',
      action: async () => {
        const response = await NoibuJS.requestHelpCode();
        if (response) {
          Alert.alert('Help Code delivered:', response);
        }
      },
    },
    {
      text: 'Simulate closed socket',
      action: () => MetroplexSocket.getInstance().socket?.close?.(1),
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
          {isErrorComponentShown ? <reactErrorSimulation /> : null}
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
        setTimeout(function standardPromiseRejectMethod() {
          return Promise.reject('Simulated promise rejection');
        }, 500);
      },
      text: 'simulate an http call and an async promise rejection ',
    },
    {
      action: async () =>
        setStorageSize(await Storage.getInstance().calculateUsedSize()),
      text: <>Calculate storage used: {storageSize} bytes</>,
    },
    {
      text: 'Clean local storage',
      action: async () => {
        const BrowserId = JSON.parse(
          (await Storage.getInstance().load('n_browser_data')) || '',
        ).BrowserId;
        await Storage.getInstance().save(
          'n_browser_data',
          JSON.stringify({ BrowserId }),
        );
        setStorageSize(await Storage.getInstance().calculateUsedSize());
      },
    },
  ];

  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <SafeAreaView style={styles.container}>
          <Text>This is expected error, click button below to reset</Text>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              setIsErrorComponentShown(false);
              resetError();
            }}>
            <Text style={styles.whiteText}>Reset error</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome to My Store</Text>
              <TouchableOpacity
                onPress={() => {
                  Navigation.push(componentId!, {
                    component: {
                      name: 'ShoppingCart',
                      passProps: {
                        handleRemoveFromCart,
                        cartItems,
                      },
                    },
                  });
                }}
                style={styles.cartButton}>
                <Text style={styles.cartButtonText}>
                  🛒{' '}
                  {Object.values(cartItems).reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}{' '}
                  items
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
              {Object.values(items).map(item => (
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
              <InputView />
            </View>
            <View style={{ marginLeft: 30 }}>
              <Text>Session info:</Text>
              {Object.entries(JSON.parse(sessionInfo || '{}')).map(entry => (
                <View key={entry[0]}>
                  <Text>
                    <>
                      * <Text style={{ fontWeight: 'bold' }}>{entry[0]}</Text>:{' '}
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
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
}
