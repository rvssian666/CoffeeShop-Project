import { createBrowserRouter } from 'react-router';
import { AppShell } from './components/AppShell';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { CartScreen } from './components/CartScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { AdminScreen } from './components/AdminScreen';
import { WireframesView } from './components/WireframesView';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, Component: LoginScreen },
      { path: 'home', Component: HomeScreen },
      { path: 'cart', Component: CartScreen },
      { path: 'payment', Component: PaymentScreen },
      { path: 'confirmation', Component: ConfirmationScreen },
      { path: 'admin', Component: AdminScreen },
      { path: 'favorites', Component: HomeScreen },
      { path: 'history', Component: HomeScreen },
    ],
  },
  {
    path: '/wireframes',
    Component: WireframesView,
  },
]);
