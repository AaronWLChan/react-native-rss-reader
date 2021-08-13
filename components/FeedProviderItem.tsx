import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../redux/hooks'
import { useNavigation } from '@react-navigation/native'
import ROUTES from '../navigation/routes'
import { FeedlyProvider } from '../types'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../navThemes'
import COLOURS from '../colours'

interface FeedProviderItemProps {
    feedProvider: FeedlyProvider
    onItemSelect: (provider: FeedlyProvider) => void
}

export default function FeedProviderItem({ feedProvider, onItemSelect }: FeedProviderItemProps) {

    const navigation = useNavigation()

    const { colors } = useTheme() 

    const [error, setError] = useState(false)


    const following = useAppSelector((state) => state.feed.feeds.some((f) => f.feedProviders.some((fp => fp.feedId === feedProvider.feedId))))

    const getWebsite = () => {

        if (!feedProvider.website) {
             return undefined 
        } 
        
        const regex = new RegExp(/https?:\/\/[^/]+/)
        
        let match = regex.exec(feedProvider.website)

        if (match) {
            return match[0].replace(/^https?:\/\//, '').toLowerCase()
        }

        return undefined
    }

    return (
        <TouchableOpacity 
            onPress={() => onItemSelect(feedProvider)}
            style={styles.container}>

            {feedProvider.iconUrl && 
                <View style={[styles.image_container, { backgroundColor: "#FFFFFF" }]}>
                    
                    {error ? 
                    <Ionicons name="logo-rss" size={24} color={COLOURS.accent} />

                    :
                    
                    <Image source={{uri: feedProvider.iconUrl}} style={{ width: 24, height: 24, }} resizeMode="cover" onError={() => setError(true)}/>
                    
                    }

                </View>
            }

            <View style={styles.text_container}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{feedProvider.title}</Text>
                <Text style={[styles.category, { color: inactiveTintColor(colors.text) }]} numberOfLines={1}>{getWebsite()}</Text>
            </View>


            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FOLLOW, { provider: feedProvider })}>
                <Ionicons name={following ? "checkmark" : "add"} size={32} color={inactiveTintColor(colors.text)}/>
            </TouchableOpacity>



        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    text_container: {
        width: "75%"
    },

    container: {
        width: "100%",
        marginTop: 8,
        marginBottom: 16, 
        padding: 8, 
        flexDirection: 'row', 
        alignItems: 'center',
        
    },


    image_container: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,  
        elevation: 5,

        marginRight: 16, 
        padding: 8, 
        borderRadius: 10,

    },




    name: {
        fontSize: 18, 
        fontWeight: '500',
    },

    category: {
        fontSize: 14, 
        color: "#808080", 
    },
    
})

