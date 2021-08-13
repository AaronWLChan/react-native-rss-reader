import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RootDrawerNavigator from './RootDrawerNavigator'
import { LightTheme, DarkTheme } from "../navThemes"
import { useAppSelector } from '../redux/hooks';

export default function Navigation() {

    const darkMode = useAppSelector((state) => state.ui.darkMode)

    return (
        <NavigationContainer theme={darkMode ? DarkTheme : LightTheme}>
            <StatusBar style={darkMode ? "light" : "dark"} />

            <View style={[styles.container, { backgroundColor: darkMode ? DarkTheme.colors.card : LightTheme.colors.card,  }]}>
                <RootDrawerNavigator/>
            </View>

        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 24,
    },
  
  
  });
  