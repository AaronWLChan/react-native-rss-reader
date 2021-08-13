import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import COLOURS from '../colours'
import { inactiveTintColor } from '../navThemes'

export interface RadioButtonProps<ValueT> {
    label: string,
    value: ValueT
    checked: boolean
    onToggle: (value: ValueT) => void
}

export default function RadioButton<ValueT>({ label, value, checked, onToggle }: RadioButtonProps<ValueT>) {

    const { colors } = useTheme()

    const onToggled = () => {
        onToggle(value)
    }

    return (
        <TouchableOpacity onPress={onToggled} style={styles.container}>
            
            {checked ? 
                <Ionicons name="radio-button-on" size={21} color={COLOURS.accent} />                
                :
                <Ionicons name="radio-button-off" size={21} color={inactiveTintColor(colors.text)} />                

            }

            <Text style={[styles.radio_label, { color: colors.text }]}>{label}</Text>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingVertical: 4,
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 16
    },

    radio_label: {
        fontSize: 18,
        marginLeft: 16,
    },
})
