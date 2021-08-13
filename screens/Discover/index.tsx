import React, { useLayoutEffect } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'
import { ListRenderItem } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ROUTES from '../../navigation/routes'
import { FeedCategory } from '../../types'
import { FEED_CATEGORY_ARRAY } from '../../data/feedCategories'
import FeedCategoryItem from '../../components/FeedCategoryItem'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../../navThemes'

export default function Discover() {

    const navigation = useNavigation()
    const { colors } = useTheme()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
  
    const renderCategoryItem: ListRenderItem<FeedCategory> = ({ item }) => {
        return <FeedCategoryItem feedCategory={item}/>
    }

    const search = () => {
        navigation.navigate(ROUTES.SEARCH_STACK)
    }


    const renderHeader = () => {
        return (
            <View style={styles.header_container}>

                <Text style={[styles.title, { color: colors.text }]}>Discover</Text>

                <View style={[styles.search_container, { backgroundColor: colors.card }]}>
                    <Ionicons name="search" size={20} color={inactiveTintColor(colors.text)}/>
                    <TextInput
                        style={[styles.searchBar]}
                        onFocus={search}
                        placeholderTextColor="#828287"
                        placeholder="Search feeds..."/>

                </View>          


                
            </View>
        )
    }


    return (
        <View style={styles.container}>

            <FlatList
                key={2}
                data={FEED_CATEGORY_ARRAY}
                bounces={false}
                renderItem={renderCategoryItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
            />
    

        </View>
    )
}
