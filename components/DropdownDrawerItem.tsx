import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Feed } from '../types'
import ROUTES from '../navigation/routes'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useAppSelector } from '../redux/hooks'
import DropdownDrawerChild from './DropdownDrawerChild'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor, activeBackgroundColor } from '../navThemes'
import COLOURS from '../colours'

interface DropdownDrawerItemProps {
    feed: Feed
    navigation: DrawerNavigationHelpers,
}

/* 
For focused state:
- Need to check for Feed-ID-Provider-ID - matches then it will be highlighted
- Need to check for Feed-ID

*/
export default function DropdownDrawerItem({ feed, navigation }: DropdownDrawerItemProps) {
    
    const [itemsVisible, setItemsVisible] = useState(false)

    const { colors } = useTheme()

    const toggleVisibility = () => {
        setItemsVisible(!itemsVisible)
    }

    const navigateToFeed = () => {
        navigation.navigate("Main", { screen: ROUTES.FEED_STACK, params: { feedID: feed.id } })
    }

    const activeLink = useAppSelector((state) => state.ui.activeDrawerLink)
    
    return (

        <View>
            <View style={activeLink === feed.id ? [styles.active_container, { backgroundColor: activeBackgroundColor() }] : styles.container}>

                <View style={styles.wrapper}>

                <TouchableOpacity onPress={toggleVisibility}>
                    <Ionicons name={itemsVisible ? "chevron-up" :"chevron-down"} size={24} color={activeLink === feed.id ? COLOURS.accent : inactiveTintColor(colors.text)} />
                </TouchableOpacity>

                
                <TouchableOpacity onPress={navigateToFeed} style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ marginLeft: 32, color: activeLink === feed.id ? COLOURS.accent : inactiveTintColor(colors.text), fontWeight: "500" }}>{feed.title}</Text>
                </TouchableOpacity>

                </View>

            </View>


            { itemsVisible && 

                feed.feedProviders.map((provider) => {

                    return (
                        <DropdownDrawerChild key={provider.feedId} feedId={feed.id} provider={provider} activeLink={activeLink} navigation={navigation}/>
                    )
                })
                 
            
            }
           

        </View>
      
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

    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
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

        backgroundColor: "white", 
        padding: 8,
        borderRadius: 10,

    },

})
