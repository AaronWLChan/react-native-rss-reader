import { StyleSheet } from 'react-native'
import COLOURS from '../../colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8, 
        paddingHorizontal: 16, 
    },

    header: {
        fontWeight: "bold", 
        fontSize: 48, 
        marginBottom: 16
    },

    label: {
        padding: 4,
        marginBottom: 8
    },

    input: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 20,
    },
    
    error_input: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 20,
        borderColor: "red",
        borderWidth: 0.25,
    },

    error: {
        color: "red",
        padding: 4,
        marginBottom: 8

    },

    
})

export default styles