import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, ListRenderItem, FlatList } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import COLOURS from '../../colours'
import parse from '../../utility/parseFeed'
import axios from 'axios'
import styles from './styles'
import ArticleItem from '../../components/ArticleItem'
import { Article, FeedlyProvider } from '../../types'
import ROUTES from '../../navigation/routes'
import { useAppSelector } from '../../redux/hooks'
import { request } from '../../api/feedly'
import LoadingLayout from '../../components/LoadingLayout'
import ErrorLayout from '../../components/ErrorLayout'
import EmptyLayout from '../../components/EmptyLayout'
import globalStyles from '../../styles/globalStyles'

type FeedProviderParams = {

    params: {
        feedId: string

    }
}

export default function FeedProviderDetail() {

    const navigation = useNavigation()
    const route = useRoute<RouteProp<FeedProviderParams, 'params'>>()

    const { feedId } = route.params

    const [provider, setProvider] = useState<FeedlyProvider>()

    const [feed, setFeed] = useState<Article[] | []>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const following = useAppSelector((state) => state.feed.feeds.some((feed) => feed.feedProviders.some((prov) => prov.feedId === feedId)))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            title: provider ? provider.title : 'Feed Details',

            headerRight: () => (

                <TouchableOpacity onPress={() =>navigation.navigate(ROUTES.FOLLOW, { provider: provider })}>
                    <Text style={globalStyles.headerRight}>{following ? "Following" : "Follow"}</Text>
                </TouchableOpacity>    

            )
        })
    }, [provider])

    const getFeed = useCallback(() => {
        
        setError(false)
        setLoading(true)

        //Get details and feed
        axios.all([request(`feeds/${encodeURIComponent(feedId)}`), axios.get(feedId.slice(5))])
            .then(axios.spread( async (...responses) => {

                const provider = responses[0] as FeedlyProvider

                const feed = await parse([responses[1].data], [provider.title])

                setProvider(provider)
                setFeed(feed)
                setLoading(false)
            }))
            .catch((error) => {
                console.log("Failed to retrieve feed! Error: " + error)
                setLoading(false)
                setError(true)
    
            })

    }, [feedId])

    const renderItem: ListRenderItem<Article> = ( { item } ) => {
        return (
            <ArticleItem article={item}/>
        )
    }

    const renderEmpty = () => {
        return (
            <EmptyLayout emptyText="No articles!"/>
        )
    }

    useEffect(() => {
        getFeed()
    }, [getFeed])


    if (error) {
        return (
            <ErrorLayout
                errorText="Failed to load feed."
                onButtonPress={getFeed}
            />
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
                data={feed}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}
