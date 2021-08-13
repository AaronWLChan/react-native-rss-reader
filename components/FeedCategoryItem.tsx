import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import ROUTES from '../navigation/routes'
import { FeedCategory } from '../types'

interface FeedCategoryItemProps {
    feedCategory: FeedCategory
}

export default function FeedCategoryItem({ feedCategory }: FeedCategoryItemProps) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={() => navigation.navigate(ROUTES.FEED_CATEGORY, { category: feedCategory })} 
        >

            <ImageBackground resizeMode="cover" source={feedCategory.imageURL} style={styles.image_container}>
                
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: feedCategory.colour }}/>

                <Text style={styles.text}>{feedCategory.name}</Text>

            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    text: { 
        textTransform: "capitalize", 
        color: "white", 
        fontSize: 21, 
        fontWeight: "800" 
    },

    container: {
        flex:1, 
        width: '100%', height: 100,
        margin: 8, 
    },

    image_container: {
        overflow: "hidden", 
        width: "100%", 
        height: "100%",  
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 10
    }

})
