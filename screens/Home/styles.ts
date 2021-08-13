import { StyleSheet } from 'react-native'
import COLOURS from '../../colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8, 
        paddingHorizontal: 16, 
    },

    header_container: {
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: "space-between"
    },

    header: {
        fontWeight: "bold", 
        fontSize: 48, 
    },

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


    empty_text: {
        fontSize: 16,
        marginTop: 16,
        marginLeft: 8,
        fontWeight: '500',
    }

    
})

export default styles