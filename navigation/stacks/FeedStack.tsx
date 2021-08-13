import React from 'react'
import ROUTES from '../routes'
import { createStackNavigator } from '@react-navigation/stack'
import Feed from '../../screens/Feed'
import { useAppDispatch } from '../../redux/hooks'
import { RouteProp, useRoute } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { setActiveDrawerLink } from '../../redux/uiSlice'

type FeedStackParams = {

    params: {
        feedID: string
    }
}

export default function FeedStack() {

    const Stack = createStackNavigator()

    const dispatch = useAppDispatch()

    const route = useRoute<RouteProp<FeedStackParams, "params">>()

    const { feedID } = route.params 

    useFocusEffect(() => {
        dispatch(setActiveDrawerLink(feedID))
    })

    return (
        <Stack.Navigator initialRouteName={ROUTES.FEED}>
            <Stack.Screen name={ROUTES.FEED} component={Feed} initialParams={{ feedID: feedID }}/>
        

        </Stack.Navigator>
    )
}
