import React from 'react'
import ROUTES from '../routes'
import { createStackNavigator } from '@react-navigation/stack'
import FeedProviderSearchModal from '../../components/Modals/FeedProviderSearchModal'
import FeedProviderDetail from '../../screens/FeedProviderDetail'
import Follow from '../../screens/Follow'

export default function SearchStack() {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ROUTES.FEED_PROVIDER_SEARCH_MODAL}>
            <Stack.Screen name={ROUTES.FEED_PROVIDER_SEARCH_MODAL} component={FeedProviderSearchModal}/>
            <Stack.Screen name={ROUTES.FEED_PROVIDER_DETAIL} component={FeedProviderDetail}/>
            <Stack.Screen name={ROUTES.FOLLOW} component={Follow}/>

        </Stack.Navigator>
    )
}
