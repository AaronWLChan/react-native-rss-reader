import { StyleSheet } from 'react-native'
import COLOURS from '../colours'

const globalStyles = StyleSheet.create({
    button_container: {
        backgroundColor: COLOURS.accent, 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderRadius: 10,
    },

    button_text: {
        fontWeight: 'bold', 
        color: "#fff", 
        fontSize: 18,
        letterSpacing: 2,

    },

    headerRight: {
        color: COLOURS.accent,
        padding: 8, 
        fontSize: 18 
    }

    
})

export default globalStyles