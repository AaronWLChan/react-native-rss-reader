import React from "react"
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"
import ROUTES from "./routes"
import { Ionicons } from "@expo/vector-icons"
import DiscoverStack from "./stacks/DiscoverStack"
import { View, TouchableOpacity } from "react-native"
import FeedStack from "./stacks/FeedStack"
import { DrawerActions } from "@react-navigation/native"
import AllFeed from "../screens/AllFeed"
import FeedProviderStack from "./stacks/FeedProviderStack"
import { useTheme } from "@react-navigation/native"
import { inactiveTintColor } from "../navThemes"
import COLOURS from "../colours"

export default function RootNavigator() {
    
    const Tab = createBottomTabNavigator()

    const { colors } = useTheme()

    const EmptyComponent = () => <View/>

    const tabBar = ({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) => {

        const focusedOptions = descriptors[state.routes[state.index].key].options;

        if (focusedOptions.tabBarVisible === false) {
          return null;
        }

        const onMenuPress = () => {
          navigation.dispatch(DrawerActions.toggleDrawer())
          
       }

        //All the routes after the first 3 should not be visible in tab-bar
        const routes = state.routes.slice(1, 3)

        return (
            <View style={{ 
            flexDirection: 'row', 
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderTopWidth: 0,
            paddingVertical: 12,
            elevation: 0, }}>

              { /* Drawer Button */ }
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={state.index > 2 ? { selected: true } : {}}
                accessibilityLabel="Toggle Drawer"
                onPress={onMenuPress}
                style={{ flex: 1, alignItems: "center" }}
                >
                <Ionicons 
                name={state.index > 2  ? "menu" : "menu-outline"}
                size={24} 
                color={state.index > 2  ? COLOURS.accent : inactiveTintColor(colors.text)}/>
              </TouchableOpacity>

                {routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    
                    const isFocused = state.index === index + 1; //+1 to skip offset
                    
                    const onPress = () => {
                        const event = navigation.emit({
                          type: 'tabPress',
                          target: route.key,
                          canPreventDefault: true,
                        });
              
                        if (!isFocused && !event.defaultPrevented) {
                          navigation.navigate(route.name);
                        }
                      };
              
                      const onLongPress = () => {
                        navigation.emit({
                          type: 'tabLongPress',
                          target: route.key,
                        });
                      };
              
                      return (
                            <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: "center" }}
                            >
                            <Ionicons 
                            name={
                                route.name === ROUTES.HOME ? (isFocused ? "today" : "today-outline") 
                                :
                                ( route.name === ROUTES.DISCOVER_STACK ? (isFocused ? "compass" : "compass-outline")
                                : 
                                (isFocused ? "menu" : "menu-outline"))
                            
                            }
                            size={24} 
                            color={isFocused ? COLOURS.accent : inactiveTintColor(colors.text)}/>
                            </TouchableOpacity>
                        )
                    

                })}
            </View>
        )

    }
    
    return (
       <Tab.Navigator 
        tabBar={tabBar}
        initialRouteName={ROUTES.HOME}
        >
            <Tab.Screen name="ToggleDrawer" component={EmptyComponent}/>
            <Tab.Screen name={ROUTES.HOME} component={Home}/>
            <Tab.Screen name={ROUTES.DISCOVER_STACK} component={DiscoverStack}/>

            <Tab.Screen name={ROUTES.ALL_FEED} component={AllFeed}/>
            <Tab.Screen name={ROUTES.FEED_STACK} component={FeedStack}/>

            <Tab.Screen name={ROUTES.FEED_PROVIDER_STACK} component={FeedProviderStack}/>

       </Tab.Navigator>
    )
}
