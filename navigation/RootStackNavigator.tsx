import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RootNavigator from './RootNavigator'
import ROUTES from './routes'
import ModalStack from './stacks/ModalStack'
import SearchStack from './stacks/SearchStack'
import NewFeed from '../screens/NewFeed'

//Add any modal stacks here
export default function RootStackNavigator() {

    const RootStack = createStackNavigator()

    return (
        <RootStack.Navigator mode="modal" initialRouteName="Main">
            <RootStack.Screen
            name="Main"
            component={RootNavigator}
            options={{ headerShown: false }}
            />

            <RootStack.Screen 
            name={ROUTES.MODAL_STACK} 
            options={{ headerShown: false }}
            component={ModalStack} />

            <RootStack.Screen 
            name={ROUTES.SEARCH_STACK} 
            options={{ headerShown: false }}
            component={SearchStack} />

            <RootStack.Screen 
            name={ROUTES.ADD_FEED} 
            options={{ headerShown: true }}
            component={NewFeed} />

        </RootStack.Navigator>
    )
}
