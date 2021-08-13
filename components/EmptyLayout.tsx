import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

interface EmptyLayoutProps{
    emptyText: string
}

export default function EmptyLayout({ emptyText }: EmptyLayoutProps) {
    
    const { colors } = useTheme()
    
    return (
        <Text style={[ styles.empty_text, { color: colors.text }]}>{emptyText}</Text>
    )
}

const styles = StyleSheet.create({
    empty_text: {
        fontSize: 16,
        marginTop: 16,
        marginLeft: 8,
        fontWeight: '500',
    }
})
