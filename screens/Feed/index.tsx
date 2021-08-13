import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { View, ListRenderItem, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useAppSelector } from '../../redux/hooks'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import ArticleItem from '../../components/ArticleItem';
import { Ionicons } from '@expo/vector-icons'
import { Article } from '../../types'
import axios from 'axios'
import parse from '../../utility/parseFeed' 
import ROUTES from '../../navigation/routes'
import ArticleTitle from '../../components/ArticleTitle'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../../navThemes'
import LoadingLayout from '../../components/LoadingLayout'
import EmptyLayout from '../../components/EmptyLayout'
import ErrorLayout from '../../components/ErrorLayout'

type FeedParams = {

    params: {
        feedID: string | undefined
    }
}

export default function Feed() {
    
    const { colors } = useTheme()

    const navigation = useNavigation()

    const route = useRoute<RouteProp<FeedParams, 'params'>>()

    const { feedID } = route.params

    const feed = useAppSelector((state) => state.feed.feeds.find((f) => f.id === feedID))!
    
    const readingMode = useAppSelector((state) => state.feed.readingMode)
    const sortMode = useAppSelector((state) => state.feed.sortMode)

    const ARTICLE_COUNT = 20

    const [visibleArticles, setVisibleArticles] = useState<Article[] | []>([])
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(ARTICLE_COUNT)

    const [articles, setArticles] = useState<Article[] | []>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useLayoutEffect(() => {

        if (feed) {
            navigation.setOptions({
                title: feed.title,
                headerBackTitleVisible: false,

                headerRight: () => (

                    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate(ROUTES.MODAL_STACK, { feed: feed })}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={inactiveTintColor(colors.text)} />
                    </TouchableOpacity>

                
                )
            })

        }

    }, [feed])

    const getFeed = useCallback(() => {

        if (feed.feedProviders.length > 0) {

            setError(false)
            setLoading(true)

            let requests = feed.feedProviders.map((provider) => axios.get(provider.feedId.slice(5)).catch((e) => null))

            axios.all(requests)
                .then(axios.spread((...responses) => {

                    //Compile response data
                    let xmlObjects: string[] = []

                    for (let i = 0; i < responses.length; i++){
                        
                        xmlObjects.push(responses[i]!.data)
                    }

                    return parse(xmlObjects, feed.feedProviders.map((provider) => provider.title), sortMode)
                }))
                .then((result) => {
                
                    setCount(result.length - ARTICLE_COUNT)

                    setArticles(result);
                    setVisibleArticles(result.slice(0, ARTICLE_COUNT)) 
                    
                    setRefreshing(false)
                    setLoading(false)
                
                })
                .catch((error) => {
                    console.log("Failed to retrieve feed! Error: " + error)
                    setRefreshing(false)
                    setLoading(false)
                    setError(true)
                })

        }
    }, [feed])

    // Called onEndReached
    const loadMore = useCallback(() => {

        if (count > 0) {
            setVisibleArticles([...visibleArticles, ...articles.slice(offset, offset + ARTICLE_COUNT)])
            setCount(count - ARTICLE_COUNT)
            setOffset(offset + ARTICLE_COUNT)
        }

    }, [count, visibleArticles, articles, count, offset])

    useEffect(() => {

        if (feed) {
            getFeed()  
        }
        
    }, [feed, getFeed])

    const renderItem: ListRenderItem<Article> = ({ item }) => {

        switch (readingMode){

            case "card":
                return <ArticleItem article={item}/>

            case "title-only":
                return <ArticleTitle article={item}/>

        }

    }

    const renderEmpty = () => {
        return (
            <EmptyLayout emptyText="No articles today!"/>
        )
    }

    if (error) {
        return (
            <ErrorLayout
                errorText="Failed to load feed."
                onButtonPress={getFeed}
            />
        )
    }

    if (feed && feed.feedProviders.length === 0){
        return (
            <EmptyLayout emptyText="You have not subscribed to any providers!"/>
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
                data={visibleArticles}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                ListEmptyComponent={renderEmpty}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => {setRefreshing(true); getFeed();}}
                        refreshing={refreshing}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

