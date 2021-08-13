import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, ListRenderItem, RefreshControl, TouchableOpacity } from 'react-native'
import styles from './styles'
import ArticleItem from '../../components/ArticleItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import parse from '../../utility/parseFeed'
import { Ionicons } from '@expo/vector-icons'
import { Article, FeedlyProvider } from '../../types'
import { useNavigation } from '@react-navigation/core';
import ROUTES from '../../navigation/routes';
import ArticleTitle from '../../components/ArticleTitle';
import { useFocusEffect } from '@react-navigation/native';
import { setActiveDrawerLink } from '../../redux/uiSlice';
import uniqBy from 'lodash/uniqBy';
import { useTheme } from '@react-navigation/native';
import { inactiveTintColor } from '../../navThemes';
import EmptyLayout from '../../components/EmptyLayout';
import ErrorLayout from '../../components/ErrorLayout';
import LoadingLayout from '../../components/LoadingLayout';

export default function AllFeed() {

    const { colors } = useTheme()

    const dispatch = useAppDispatch()

    const feeds = useAppSelector((state) => state.feed.feeds)
    const readingMode = useAppSelector((state) => state.feed.readingMode)
    const sortMode = useAppSelector((state) => state.feed.sortMode)
    
    //Num. of articles to load each time list reaches end
    const ARTICLE_COUNT = 20

    const [visibleArticles, setVisibleArticles] = useState<Article[] | []>([])
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(ARTICLE_COUNT)

    const [articles, setArticles] = useState<Article[] | []>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    //Goes through each feed, if providers length at least 1 return true
    const hasProviders = useCallback(() => {
    
        const len = feeds.length

        for (let i = 0; i < len; i++){

            if (feeds[i].feedProviders.length > 0){
                return true
            }
        }

        return false
    }, [feeds])

    const getFeed = useCallback(() => {

        if (feeds.length > 0 && hasProviders()) {

            setError(false)
            setLoading(true)

            let providers: FeedlyProvider[] = []

            const len = feeds.length

            for (let i = 0; i < len; i++){
                providers = [...providers, ...feeds[i].feedProviders]
            }

            providers = uniqBy(providers, "feedId")

            let requests = providers.map((provider) => axios.get(provider.feedId.slice(5)).catch((e) => null))

            axios.all(requests)
                .then(axios.spread((...responses) => {

                    //Compile response data
                    let xmlObjects: string[] = []

                    for (let i = 0; i < responses.length; i++){
                        
                        xmlObjects.push(responses[i]!.data)
                    }

                    return parse(xmlObjects, providers.map((provider) => provider.title), sortMode)
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
    }, [feeds, hasProviders])

    // Called onEndReached
    const loadMore = useCallback(() => {

        if (count > 0) {
            setVisibleArticles([...visibleArticles, ...articles.slice(offset, offset + ARTICLE_COUNT)])
            setCount(count - ARTICLE_COUNT)
            setOffset(offset + ARTICLE_COUNT)
        }

    }, [count, visibleArticles, articles, offset])

    useFocusEffect(() => {
        dispatch(setActiveDrawerLink(ROUTES.ALL_FEED))
    })

    //Needs to trigger whenever sortMode changes as well
    useEffect(() => {
        getFeed()  
        
    }, [feeds, sortMode, getFeed])

    const navigation = useNavigation()

    const renderItem: ListRenderItem<Article> = ({ item }) => {

        switch (readingMode){

            case "card":
                return <ArticleItem article={item}/>

            case "title-only":
                return <ArticleTitle article={item}/>

        }

    }

    const renderHeader = () => {
        return (
            <View style={styles.header_container}>

                <Text style={[styles.header, { color: colors.text }]}>All</Text>

                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MODAL_STACK, { feed: undefined })}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={inactiveTintColor(colors.text)}/>
                </TouchableOpacity>

            </View>
        )
    }

    const renderEmpty = () => {
        return (
            <EmptyLayout emptyText="No articles today!"/>
        )
    }


    //If there are no created-feeds
    if (feeds.length === 0){
        return (
            <ErrorLayout 
                onButtonPress={() => navigation.navigate(ROUTES.ADD_FEED)} 
                buttonText="ADD FEED" 
                errorText="You have not created any feeds!"
            />
        )
    }

    //If there are feeds but there are no subscriptions
    if (!hasProviders){
        return (
            <ErrorLayout 
                onButtonPress={() => navigation.navigate(ROUTES.DISCOVER_STACK)} 
                buttonText="DISCOVER" 
                errorText="You are not following any feeds!"
            />
        )
    }

    if (error) {
        return (
            <ErrorLayout 
                onButtonPress={getFeed} 
                errorText="Failed to load feed."
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
                data={visibleArticles}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
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
