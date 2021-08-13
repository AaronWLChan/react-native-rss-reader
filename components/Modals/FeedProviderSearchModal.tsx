import React, { useLayoutEffect, useState, useRef } from 'react'
import { StyleSheet, FlatList, View, ListRenderItem, TextInput, Button, Text, TouchableOpacity } from 'react-native'
import { debounce } from 'lodash'
import { FeedlyProvider, FeedlyQueryResponse, } from '../../types'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import COLOURS from '../../colours'
import ROUTES from '../../navigation/routes'
import query from '../../api/feedly'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../../navThemes'

import FeedProviderItem2 from '../FeedProviderItem'
import globalStyles from '../../styles/globalStyles'

export default function FeedProviderSearchModal() {

    const { colors } = useTheme()

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            title: "Search",
            headerRight: () => 
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.headerRight}>Cancel</Text>
                </TouchableOpacity>    
        })
    }, [])


    const [filteredProviders, setFilteredProviders] = useState<FeedlyProvider[]>([])
    const [error, setError] = useState(false)

    const inputRef = useRef<TextInput>(null)

    const onChangeText = (text: string) => {

        if (text) {

            query(text)
                .then((r ) => {

                    let { results } = r as FeedlyQueryResponse

                    //Display in list
                    setFilteredProviders(results)

                })
                .catch(((e) => {console.log("Encountered error: " + e); setError(true)}))            

        }

        else {
            setFilteredProviders([])
        }  

    }

    const search = debounce((text => {
        onChangeText(text)
    }), 500)

    const onItemSelect = (provider: FeedlyProvider) => {
        navigation.navigate(ROUTES.FEED_PROVIDER_DETAIL, { feedId: provider.feedId })
    }


    const renderItem: ListRenderItem<FeedlyProvider> = ({ item }) => {
        return (
            <FeedProviderItem2 feedProvider={item} onItemSelect={onItemSelect}/>
        )
    }

    const clearText = () => {
        
        if (inputRef && inputRef.current) {
            inputRef.current.clear()

            setFilteredProviders([])
        }

    }

    return (
            <View style={styles.container}>

                <View style={[styles.search_container, { backgroundColor: colors.card }]}>
                    <Ionicons name="search" size={20} color={inactiveTintColor(colors.text)}/>

                    <TextInput
                        ref={inputRef}
                        autoFocus={true}
                        style={[styles.searchBar, { color: inactiveTintColor(colors.text) }]}
                        onChangeText={search}
                        placeholderTextColor={inactiveTintColor(colors.text)}
                        placeholder="Search feeds..."/>

                    
                    
                    <Ionicons name="close-circle" size={20} color={inactiveTintColor(colors.text)} onPress={clearText}/>
                    
                </View>         

                {error ? 
                
                    <View>
                        <Text style={[styles.error_text, { color: colors.text }]}>Failed to retrieve results! Try Again.</Text>
                    </View>

                :

                <FlatList
                    data={filteredProviders}
                    bounces={false}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                 />

                }
                
               
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        borderRadius: 20,
    },

    search_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 50,

    },

    searchBar: {
        paddingLeft: 8,
        paddingRight: 4,
        flex: 1,
        fontSize: 18,        
    },

    error_text: {
        fontSize: 18
    }
})
