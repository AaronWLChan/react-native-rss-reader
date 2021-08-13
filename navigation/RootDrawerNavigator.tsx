import React from "react"
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import ROUTES from "./routes"
import { Ionicons } from "@expo/vector-icons"
import RootStackNavigator from "./RootStackNavigator"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { View, Text, Switch, Platform } from "react-native"
import DropdownDrawerItem from "../components/DropdownDrawerItem"
import { useTheme } from "@react-navigation/native"
import COLOURS from "../colours"
import { toggleDarkMode } from "../redux/uiSlice"
import { activeBackgroundColor, inactiveTintColor } from "../navThemes"

export default function RootNavigator() {
    
    const Drawer = createDrawerNavigator()

    const dispatch = useAppDispatch()

    const feeds = useAppSelector((state) => state.feed.feeds)

    const activeLink = useAppSelector((state) => state.ui.activeDrawerLink)

    const darkMode = useAppSelector((state) => state.ui.darkMode)

    const { colors } = useTheme()

    //https://stackoverflow.com/questions/60622829/highlight-current-active-drawer-menu-in-react-navigation-v5
    const drawerContent = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItem {...props}
                        label="Today"
                        focused={activeLink === ROUTES.HOME}
                        onPress={() => props.navigation.navigate("Main", { screen:ROUTES.HOME } )}
                        icon={({ color, size, focused }) => (
                            <Ionicons
                                name="today"
                                color={color}
                                size={size}
                            />
                        )}
                    />

                    <DrawerItem {...props}
                        label="Discover"
                        focused={activeLink === ROUTES.DISCOVER_STACK}
                        onPress={() => props.navigation.navigate("Main", { screen:ROUTES.DISCOVER_STACK })}
                        icon={({ color, size, focused }) => (
                            <Ionicons
                                name="compass"
                                color={color}
                                size={size}
                            />
                        )}
                    />

                    <Text style={{ margin: 16, fontWeight: "500", color: inactiveTintColor(colors.text) }}>Feeds</Text>


                    <DrawerItem {...props}
                        label="All"
                        onPress={() =>  props.navigation.navigate("Main", { screen:ROUTES.ALL_FEED })}
                        focused={activeLink === ROUTES.ALL_FEED}
                        icon={({ color, size, focused }) => (
                            <Ionicons
                                name="menu"
                                color={color}
                                size={size}
                            />
                        )}
                    />

                    {feeds.map((feed) => {

                        return (
                            <DropdownDrawerItem key={feed.id} feed={feed} navigation={props.navigation}/>
                        )

                    })}

                    <DrawerItem {...props}
                        label="Create New Feed"
                        onPress={() =>  props.navigation.navigate(ROUTES.ADD_FEED)}
                        focused={activeLink === ROUTES.ADD_FEED}
                  
                    />

                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', margin: 16, alignItems: "center" }}>
                        <Text style={{ color: inactiveTintColor(colors.text), fontWeight: "500", }}>Dark Mode</Text>

                        <Switch 
                            value={darkMode} 
                            onValueChange={() => dispatch(toggleDarkMode()) } 
                            thumbColor={Platform.OS === "android" ? COLOURS.accent : "#ffffff"}
                            trackColor={{ true: COLOURS.accent, false: activeBackgroundColor() }}/>
                    </View>

                </DrawerContentScrollView>
            </View>
        )
    }
    
    return (
       <Drawer.Navigator initialRouteName="RootStack" drawerContentOptions={{ activeTintColor: COLOURS.accent }}  drawerContent={drawerContent}>
            <Drawer.Screen name="RootStack" component={RootStackNavigator}/> 

       </Drawer.Navigator>
    )
}
