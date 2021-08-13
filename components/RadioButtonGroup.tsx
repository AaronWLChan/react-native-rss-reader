import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RadioButton from './RadioButton'
import { useTheme } from '@react-navigation/native'

interface RadioButtonGroupProps<ValueT> {
    header?: string,
    data: RadioButtonData<ValueT>[]
    onToggle: (value: ValueT) => void,
    selectedValue: ValueT
}

export interface RadioButtonData<ValueT> {
    label: string,
    value: ValueT
}


export default function RadioButtonGroup<ValueT>({ header, data, onToggle, selectedValue }: RadioButtonGroupProps<ValueT>) {

    const { colors } = useTheme()

    const [selectValue, setSelectValue] = useState(selectedValue)
    
    const onToggled = (value: ValueT) => {
        setSelectValue(value)
        onToggle(value)
    }
    
    return (
        <View style={styles.container}>

            {header && 
                <Text style={[styles.category_header, { color: colors.text }]}>{header}</Text>
            }

            {data.map((item, index) => <RadioButton key={index} label={item.label} value={item.value} checked={item.value === selectValue} onToggle={onToggled}/>)}
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginBottom: 16
    },

    category_header: {
        fontSize: 16, 
        fontWeight: '500',
        marginBottom: 16
    }
})
