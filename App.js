import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import ScreenRoute from './Screen/Route/ScreenRoute';
import React, { useCallback, useState } from 'react';
import { UserCredentials } from './Screen/Component/UserCredentials';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded] = useFonts({
    'Mulish-Black': require('./assets/font/Mulish-Black.ttf'),
    'Mulish-BlackItalic': require('./assets/font/Mulish-BlackItalic.ttf'),
    "Mulish-Bold": require('./assets/font/Mulish-Bold.ttf'),
    'Mulish-ExtraBold': require('./assets/font/Mulish-ExtraBold.ttf'),
    "Mulish-BoldItalic": require('./assets/font/Mulish-BoldItalic.ttf'),
    "Mulish-Light": require('./assets/font/Mulish-Light.ttf'),
    'Mulish-Medium': require('./assets/font/Mulish-Medium.ttf'),
    'Mulish-MediumItalic': require('./assets/font/Mulish-MediumItalic.ttf'),
    'Mulish-Regular': require('./assets/font/Mulish-Regular.ttf'),
    "Mulish-SemiBold": require('./assets/font/Mulish-SemiBold.ttf'),
  });

  const [userData, setUserData] = useState(null); // Initialize UserData with null

  const storeValues = (item) => {
    setUserData(item);
  };

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <UserCredentials.Provider value={{ storeValues, userData }}> {/* Fixed casing */}
      <View style={styles.container} onLayout={handleOnLayout}>
        <StatusBar style="auto" /> {/* Changed hidden prop */}
        <ScreenRoute />
      </View>
    </UserCredentials.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
