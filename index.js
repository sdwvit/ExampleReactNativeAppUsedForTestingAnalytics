/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import App from './src/App';
import ShoppingCart from './src/ShoppingCart';

Navigation.registerComponent('Home', () => App);
Navigation.registerComponent('ShoppingCart', () => ShoppingCart);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
