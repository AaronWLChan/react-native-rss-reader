import React from 'react'
import ROUTES from '../routes'
import { createStackNavigator } from '@react-navigation/stack'
import Discover from '../../screens/Discover'
import FeedProviderDetail from '../../screens/FeedProviderDetail'
import COLOURS from '../../colours'
import Follow from '../../screens/Follow'
import { FeedCategory, FeedlyProvider } from '../../types'
import FeedCategoryScreen from '../../screens/FeedCategory'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch } from '../../redux/hooks'
import { setActiveDrawerLink } from '../../redux/uiSlice'

type DiscoverStackParamsList = {
    [ROUTES.DISCOVER]: undefined,
    [ROUTES.FEED_PROVIDER_DETAIL]: FeedlyProvider,
    [ROUTES.FOLLOW]: FeedlyProvider,
    [ROUTES.FEED_CATEGORY]: FeedCategory
}

export default function DiscoverStack() {

    const Stack = createStackNavigator<DiscoverStackParamsList>()

    const dispatch = useAppDispatch()

    useFocusEffect(() => {
        dispatch(setActiveDrawerLink(ROUTES.DISCOVER_STACK))
    })

    return (
        <Stack.Navigator initialRouteName={ROUTES.DISCOVER}>
            <Stack.Screen name={ROUTES.DISCOVER} component={Discover}/>
            <Stack.Screen name={ROUTES.FEED_PROVIDER_DETAIL} component={FeedProviderDetail}/>
            <Stack.Screen name={ROUTES.FOLLOW} component={Follow}/>
            <Stack.Screen name={ROUTES.FEED_CATEGORY} component={FeedCategoryScreen}/>
    

        </Stack.Navigator>
    )
}
