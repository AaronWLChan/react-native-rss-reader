import React from 'react'
import ROUTES from '../routes'
import { createStackNavigator } from '@react-navigation/stack'
import FeedPreferenceModal from '../../components/Modals/FeedPreferenceModal'
import ManageFeedDetailsModal from '../../components/Modals/ManageFeedDetailsModal'
import ManageFeedSourcesModal from '../../components/Modals/ManageFeedSourcesModal'
import { Feed } from '../../types'
import { useRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import Follow from '../../screens/Follow'

type ModalStackParams = {

    params: {
        feed: Feed
    }
}

export default function ModalStack() {

    const Stack = createStackNavigator()

    const route = useRoute<RouteProp<ModalStackParams, "params">>()

    const { feed } = route.params

    return (
        <Stack.Navigator initialRouteName={ROUTES.FEED_PREFERENCE_MODAL}>
            <Stack.Screen name={ROUTES.FEED_PREFERENCE_MODAL} component={FeedPreferenceModal} initialParams={{ feed: feed }}/>
            <Stack.Screen name={ROUTES.FEED_DETAILS_MODAL} component={ManageFeedDetailsModal}/>
            <Stack.Screen name={ROUTES.FEED_SOURCES_MODAL} component={ManageFeedSourcesModal}/>
            <Stack.Screen name={ROUTES.FOLLOW} component={Follow}/>

        </Stack.Navigator>
    )
}
