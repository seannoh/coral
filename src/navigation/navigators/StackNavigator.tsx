import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import WelcomeScreen, {
  WelcomeScreenProps,
} from '../../screens/auth/welcomeScreen/WelcomeScreen';
import TabNavigator from './TabNavigator';
import useAuth from '../../../auth/useAuth';
import LoadingScreen, {LoadingScreenProps} from '../../components/Loading';
import ChatScreen, {
  ChatScreenProps,
} from '../../screens/stack/chatScreen/ChatScreen';

type AuthStackNavigatorScreens = {
  welcome: WelcomeScreenProps;
  loading: LoadingScreenProps;
  // ADD more auth screens here
};

type AuthStackNavigatorPages = keyof AuthStackNavigatorScreens;

type AppStackNavigatorScreens = {
  tabNavigator: EmptyProps;
  chat: ChatScreenProps;
  // ADD more app screens here
};

type AppStackNavigatorPages = keyof AppStackNavigatorScreens;

type StackNavigatorScreens = AuthStackNavigatorScreens &
  AppStackNavigatorScreens;

type StackNavigatorPages = keyof StackNavigatorScreens;

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<StackNavigatorScreens>();
  const {authState} = useAuth();

  return (
    <Stack.Navigator
      id={'stack-navigator'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'welcome'}>
      {authState === 'AUTHENTICATED' ? (
        <>
          <Stack.Screen name={'tabNavigator'} component={TabNavigator} />
          <Stack.Screen name={'chat'} component={ChatScreen} />
          {/* ADD more app stack screens here */}
        </>
      ) : authState === 'LOADING' ? (
        <Stack.Screen name={'loading'} component={LoadingScreen} />
      ) : (
        <Stack.Screen name={'welcome'} component={WelcomeScreen} />
      )}
    </Stack.Navigator>
  );
}

export const authStackNavigate = (
  navigation: NativeStackNavigationProp<any>,
  screen: AuthStackNavigatorPages,
) => navigation.navigate(screen);

export const appStackNavigate = <Page extends keyof AppStackNavigatorScreens>(
  navigation: NativeStackNavigationProp<any>,
  screen: Page,
  params: AppStackNavigatorScreens[Page],
) => navigation.navigate(screen as string, params);

export type AuthStackPageProps<Page extends AuthStackNavigatorPages> =
  NativeStackScreenProps<AuthStackNavigatorScreens, Page, 'stack-navigator'>;

export type AppStackPageProps<Page extends AppStackNavigatorPages> =
  NativeStackScreenProps<AppStackNavigatorScreens, Page, 'stack-navigator'>;
