import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, ListRenderItem, FlatList  } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import { FeedCategory as FeedCategoryType, FeedlyProvider, FeedlyQueryResponse } from '../../types'
import ROUTES from '../../navigation/routes'
import FeedProviderItem from '../../components/FeedProviderItem'
import query from '../../api/feedly'
import { useTheme } from '@react-navigation/native'
import { useCallback } from 'react'
import ErrorLayout from '../../components/ErrorLayout'
import LoadingLayout from '../../components/LoadingLayout'
import EmptyLayout from '../../components/EmptyLayout'

type FeedCategoryParams = {

    params: {
        category: FeedCategoryType
    }
}

export default function FeedCategory() {

    const navigation = useNavigation()
    const route = useRoute<RouteProp<FeedCategoryParams, 'params'>>()

    const category = route.params.category

    const [providers, setProviders] = useState<FeedlyProvider[] | []>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            title: category.name.slice(0, 1).toUpperCase() + category.name.slice(1),
        })
    }, )

    const getProviders = useCallback(() => {

        //For reload
        setError(false)
        setLoading(true)
        
        query(category.name)
            .then((response) => {

                const { results } = response as FeedlyQueryResponse
                setProviders(results)

                setLoading(false)
            })
            .catch((e) => {console.log("Error: " + e); setError(true); setLoading(false); })
    }, [category])

    useEffect(() => {
        getProviders()
    }, [getProviders])

    const onItemSelect = (provider: FeedlyProvider) => {
        navigation.navigate(ROUTES.FEED_PROVIDER_DETAIL, { feedId: provider.feedId })
    }

    const renderItem: ListRenderItem<FeedlyProvider> = ( { item } ) => {
        return (
            <FeedProviderItem feedProvider={item} onItemSelect={onItemSelect}/>
        )
    }

    const renderEmpty = () => {
        return (
            <EmptyLayout emptyText="No providers!"/>
        )
    }

    if (error) {
        return (
            <ErrorLayout errorText="Failed to load feed." onButtonPress={getProviders}/>
        )
    }


    if (loading) {
        return (
            <LoadingLayout/>
        )
    }


    return (
        <View style={styles.container}>

            <FlatList
                data={providers}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}
