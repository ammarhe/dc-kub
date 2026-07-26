import './src/polyfills';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ViewerProvider, useViewer } from './src/state/ViewerContext';
import LibraryScreen from './src/screens/LibraryScreen';
import ViewerScreen from './src/screens/ViewerScreen';
import ImportSheet from './src/sheets/ImportSheet';
import InfoSheet from './src/sheets/InfoSheet';
import ShareSheet from './src/sheets/ShareSheet';

function Root() {
  const { screen } = useViewer();
  return (
    <>
      {screen === 'library' ? <LibraryScreen /> : <ViewerScreen />}
      <ImportSheet />
      <InfoSheet />
      <ShareSheet />
      <StatusBar style="dark" />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ViewerProvider>
        <Root />
      </ViewerProvider>
    </SafeAreaProvider>
  );
}
