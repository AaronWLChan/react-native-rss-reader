import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import globalStyles from '../styles/globalStyles'

interface ErrorLayoutProps {
    errorText: string,
    buttonText?: string,
    onButtonPress: () => void
}

export default function ErrorLayout({ errorText, buttonText = "TRY AGAIN", onButtonPress }: ErrorLayoutProps) {
    const { colors } = useTheme()

    return (
        <View style={styles.alt_container}>
            <Text style={[styles.error_text, { color: colors.text }]}>{errorText}</Text>

            <TouchableOpacity style={globalStyles.button_container} onPress={onButtonPress}>
                <Text style={globalStyles.button_text}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    alt_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    error_text: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 24,
    },
})
