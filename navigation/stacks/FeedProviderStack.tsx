import React from 'react'
import ROUTES from '../routes'
import { createStackNavigator } from '@react-navigation/stack'
import COLOURS from '../../colours'
import { RouteProp, useRoute } from '@react-navigation/core'
import FeedProviderDetail from '../../screens/FeedProviderDetail'
import Follow from '../../screens/Follow'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch } from '../../redux/hooks'
import { setActiveDrawerLink } from '../../redux/uiSlice'

type FeedProviderStackParams = {

    params: {
        feedID: string,
        providerID: string
    }
}

export default function FeedProviderStack() {

    const Stack = createStackNavigator()

    const dispatch = useAppDispatch()

    const route = useRoute<RouteProp<FeedProviderStackParams, "params">>()

    const { feedID, providerID } = route.params 

    useFocusEffect(() => {
        dispatch(setActiveDrawerLink(`${feedID}-${providerID}`))
    })

    return (
        <Stack.Navigator initialRouteName={ROUTES.FEED_PROVIDER_DETAIL}>
            <Stack.Screen name={ROUTES.FEED_PROVIDER_DETAIL} component={FeedProviderDetail} initialParams={{ feedId: providerID }}/>
            <Stack.Screen name={ROUTES.FOLLOW} component={Follow}/>
        

        </Stack.Navigator>
    )
}
