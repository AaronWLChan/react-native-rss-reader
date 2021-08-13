import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Switch } from 'react-native'
import { FeedlyProvider, Feed } from '../types'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updateFeedProviders } from '../redux/feedSlice'
import { useTheme } from '@react-navigation/native'
import COLOURS from '../colours'
import { activeBackgroundColor } from '../navThemes'

interface FollowProviderItemProps {
    feed: Feed
    provider: FeedlyProvider
}

export default function FollowProviderItem({ feed, provider }: FollowProviderItemProps) {

    const { colors } = useTheme() 

    const dispatch = useAppDispatch()

    const following = useAppSelector((state) => state.feed.feeds.find((f) => f.title === feed.title)!.feedProviders.some((p) => p.feedId === provider.feedId))

    const onFollow = () => {
        dispatch(updateFeedProviders({ feed: feed, provider: provider, action: following ? "remove" : "add" }))
    }


    return (
        <View 
        style={styles.container}>
            <Text style={[styles.feedName, { color: colors.text }]}>{feed.title}</Text>
            

            <Switch 
                value={following} 
                onValueChange={onFollow} 
                thumbColor={Platform.OS === "android" ? COLOURS.accent : "#ffffff"}
                trackColor={{ true: COLOURS.accent, false: activeBackgroundColor() }}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        paddingHorizontal: 16, 
        paddingBottom: 8, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between'
    },

    feedName: {
        fontSize: 18, 
        fontWeight: '500'
    }
})
