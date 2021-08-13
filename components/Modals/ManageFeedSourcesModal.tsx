import React, { useLayoutEffect } from 'react'
import { View, ListRenderItem, FlatList } from 'react-native'
import FeedProviderItem from '../FeedProviderItem'
import { RouteProp, useNavigation } from '@react-navigation/core'
import ROUTES from '../../navigation/routes'
import { useRoute } from '@react-navigation/core'
import { Feed, FeedlyProvider } from '../../types'
import { StyleSheet } from 'react-native'
import ErrorLayout from '../ErrorLayout'

//Flat list of subscriptions 
type ManageFeedSourcesParams =  {
    params: {
        feed: Feed
    }
}

export default function ManageFeedSourcesModal() {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Following",

            headerBackTitleVisible: false,

        })
    }, [])

    const route = useRoute<RouteProp<ManageFeedSourcesParams, "params">>()

    const { feed } = route.params

    const onItemSelect = (provider: FeedlyProvider) => {
        navigation.navigate(ROUTES.FOLLOW, { provider: provider })
    }

    const renderItem: ListRenderItem<FeedlyProvider> = ({ item }) => {
        return (
            <FeedProviderItem feedProvider={item} onItemSelect={onItemSelect}/>
        )
    }

    if (!feed.feedProviders || feed.feedProviders.length === 0) {
        return (
            <ErrorLayout
                errorText="You don't have any subscriptions"
                buttonText="DISCOVER"
                onButtonPress={() => navigation.navigate(ROUTES.DISCOVER_STACK)}
            />
        )
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={feed.feedProviders}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
            
        </View>
    )
}



const styles = StyleSheet.create({

    title: {
        fontWeight: "bold", 
        fontSize: 48, 
        marginBottom: 8},

    container: {
        paddingTop: 8, 
        paddingHorizontal: 16, 
        flex: 1},


})

