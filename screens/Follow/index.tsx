import React, { useLayoutEffect }  from 'react'
import { View, FlatList, ListRenderItem } from 'react-native'
import styles from './styles'
import { useAppSelector } from '../../redux/hooks'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FeedlyProvider, Feed } from '../../types'
import FollowProviderItem from '../../components/FollowProviderItem'
import EmptyLayout from '../../components/EmptyLayout'

type FollowRouteParams = {

    params: {
        provider: FeedlyProvider
    }
}

export default function Follow() {
    
    const navigation = useNavigation()
    const route = useRoute<RouteProp<FollowRouteParams, 'params'>>()

    const { provider } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Follow Provider",
            headerBackTitleVisible: false,
        })
    }, [])

    const feeds = useAppSelector((state) => state.feed.feeds)

    const renderItem: ListRenderItem<Feed> = ({ item }) => <FollowProviderItem feed={item} provider={provider}/>

    const renderEmpty = () => <EmptyLayout emptyText="You haven't created any feeds!"/>
            
    return (
        <View style={styles.container}>
            <FlatList
            style={{paddingTop: 16}}
            data={feeds}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            bounces={false}
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

