import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './src/navigation/AppNavigator';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <AppNavigator/>
    </RecoilRoot>

  );
}
