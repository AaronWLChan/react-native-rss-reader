import React, { useLayoutEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import RadioButtonGroup from '../RadioButtonGroup'
import { RadioButtonData } from '../RadioButtonGroup'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { ReadingMode, SortMode, Feed } from '../../types'
import { Ionicons } from '@expo/vector-icons'
import COLOURS from '../../colours'
import { useNavigation, useRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import ROUTES from '../../navigation/routes'
import { Alert } from 'react-native'
import { changeReadingMode, changeSortMode, removeFeed } from '../../redux/feedSlice'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../../navThemes'
import globalStyles from '../../styles/globalStyles'

type FeedPreferenceModalParams = {
    params: {
        feed: Feed
    }
}

const readingModeItems: RadioButtonData<ReadingMode>[] = [
    {
        label: "Card View",
        value: "card",
    },

    {
        label: "Title View",
        value: "title-only",
    }
]

const sortModeItems: RadioButtonData<SortMode>[] = [
    {
        label: "Descending",
        value: "desc"
    },

    {
        label: "Ascending",
        value: "asc"
    }
]

//Values from each need to bubble up to here and should be assigned to state / app selector state


export default function FeedPreferenceModal() {

    const { colors } = useTheme()

    const navigation = useNavigation()
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Customise Feed",

            headerLeft: () => null,

            headerRight: () => (
                
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.headerRight}>Done</Text>
                </TouchableOpacity>              
            )
        })
    }, [])

    const route = useRoute<RouteProp<FeedPreferenceModalParams, "params">>()

    const { feed } = route.params
    
    const readingMode = useAppSelector((state) => state.feed.readingMode)
    const sortMode = useAppSelector((state) => state.feed.sortMode)

    const onReadingModeSelect = (value: ReadingMode) => {
        dispatch(changeReadingMode(value))
    }

    const onSortModeSelect = (value: SortMode) => {
        dispatch(changeSortMode(value))
    }

    const onDelete = () => {
        
        Alert.alert("Delete Feed?", 
            "Are you sure you want to delete this feed?", 
            [
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        dispatch(removeFeed(feed.id))
                        navigation.navigate('Main', { screen: ROUTES.HOME })
                    }
                },

                {
                    text: "Cancel",
                    style: "cancel"
                }
            
            ])
    }
    
    return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>

                <RadioButtonGroup
                    header="View"
                    selectedValue={readingMode}
                    onToggle={onReadingModeSelect}
                    data={readingModeItems}
                />

                <RadioButtonGroup
                    header="Sort By"
                    selectedValue={sortMode}
                    onToggle={onSortModeSelect}
                    data={sortModeItems}
                />

                { feed && 

                    <View style={{ marginBottom: 16 }}>
                        <Text style={[styles.category_header, { color: colors.text }]}>More Options</Text>

                        
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FEED_DETAILS_MODAL, { feed: feed })} style={styles.option_container}>
                            <Ionicons name="pencil" size={24} color={inactiveTintColor(colors.text)} />
                            <Text style={[styles.radio_label, { color: colors.text }]}>Rename</Text>
                        </TouchableOpacity>        
                        

                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FEED_SOURCES_MODAL, { feed: feed })} style={styles.option_container}>
                            <Ionicons name="logo-rss" size={24} color={inactiveTintColor(colors.text)} />

                            <Text style={[styles.radio_label, { color: colors.text }]}>Edit Sources</Text>
                        </TouchableOpacity>                    
                        
                        
                        <TouchableOpacity onPress={onDelete} style={styles.option_container}>
                            <Ionicons name="trash-bin-outline" size={24} color={COLOURS.accent} />

                            <Text style={styles.delete_label}>Delete</Text>
                        </TouchableOpacity>        
                    
                    
                    </View>

                }
                
            </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16, 
    },

    header: {
        textAlign: 'center',
        fontSize: 16, 
        fontWeight: '500',
        marginBottom: 16
    },

    radio_label: {
        fontSize: 18,
        marginLeft: 16,
    },

    category_header: {
        fontSize: 16, 
        fontWeight: '500',
        marginBottom: 16
    },

    option_container: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },

    delete_label: {
        fontSize: 18,
        marginLeft: 16,
        color: COLOURS.accent
    }

})
