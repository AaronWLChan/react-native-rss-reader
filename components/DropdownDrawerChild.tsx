import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FeedlyProvider } from '../types'
import ROUTES from '../navigation/routes'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { inactiveTintColor, activeBackgroundColor } from '../navThemes'
import { useTheme } from '@react-navigation/native'
import COLOURS from '../colours'

interface DropdownDrawerChildProps {
    feedId: string,
    provider: FeedlyProvider
    activeLink: string,
    navigation: DrawerNavigationHelpers,
}

export default function DropdownDrawerChild({ feedId, activeLink, provider, navigation }: DropdownDrawerChildProps) {

    const navigateToProvider = (provider: FeedlyProvider) => {
        navigation.navigate("Main", { screen: ROUTES.FEED_PROVIDER_STACK, params: { feedID: feedId, providerID: provider.feedId } })
    }

    const { colors } = useTheme()

    const [error, setError] = useState(false)

    return (
        <TouchableOpacity 
            onPress={() => navigateToProvider(provider)} 
            style={activeLink === `${feedId}-${provider.feedId}` ? [styles.active_container, { backgroundColor: activeBackgroundColor() } ] : styles.container}>

            <View style={styles.child_wrapper}>

                <View style={[styles.image_container, { backgroundColor: "#FFFFFF" }]}>

                    {provider.iconUrl ? 
                        
                        error ?
                        <Ionicons name="logo-rss" size={16} color={COLOURS.accent} />
                        :
                        <Image source={{uri: provider.iconUrl}} style={{ height: 16, width: 16 }} onError={() => setError(true)}/>
                    :
                        <Ionicons name="logo-rss" size={16} color={COLOURS.accent} />

                    }

                </View>


                <Text style={{ marginLeft: 24, color: activeLink === `${feedId}-${provider.feedId}` ? COLOURS.accent : inactiveTintColor(colors.text), fontWeight: "500" }}>{provider.title}</Text>

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   

    container: {
        marginHorizontal: 10,
        borderRadius: 4,
        overflow: 'hidden', 
        marginVertical: 4,
    },

    active_container: {
        marginHorizontal: 10,
        borderRadius: 4,
        overflow: 'hidden', 
        marginVertical: 4,
    },

    child_wrapper: {
        marginLeft: 56,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },

    image_container: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,  
        elevation: 5,

        padding: 8,
        borderRadius: 10,

    },
})
