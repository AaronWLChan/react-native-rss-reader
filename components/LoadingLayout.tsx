import React from 'react'
import { StyleSheet, ActivityIndicator, View, Platform } from 'react-native'
import COLOURS from '../colours'

export default function LoadingLayout() {
    return (
        <View style={styles.alt_container}>
                <ActivityIndicator 
                    size={Platform.OS == "android" ? 'large' : "small"}
                    color={Platform.OS === "android" ? COLOURS.accent : undefined}/>
        </View>
    )
}

const styles = StyleSheet.create({
    alt_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
