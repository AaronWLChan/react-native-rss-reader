import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold", 
        fontSize: 48, 
        marginBottom: 8
    },

    container: {
        paddingTop: 8, 
        paddingHorizontal: 16, 
        flex: 1 
    },

    search_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 50,
        marginRight: 16

    },

    searchBar: {
        paddingLeft: 8,
        paddingRight: 4,
        flex: 1,
        fontSize: 18,
        
    },

    header_container: {
        marginBottom: 8
    },

    
})

export default styles
