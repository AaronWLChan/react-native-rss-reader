import React, { useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import COLOURS from '../../colours'
import { Feed } from '../../types'
import { useForm, Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { updateFeed } from '../../redux/feedSlice'
import { useTheme } from '@react-navigation/native'
import {inactiveTintColor } from '../../navThemes'
import globalStyles from '../../styles/globalStyles'

//https://react-hook-form.com/get-started#ReactNative
type Form = {
    title: string
}

type ManageFeedDetailsParams =  {
    params: {
        feed: Feed
    }
}

export default function ManageFeedDetailsModal() {

    const { colors } = useTheme()

    const { control, handleSubmit, formState: { errors } } = useForm<Form>()

    const route = useRoute<RouteProp<ManageFeedDetailsParams, "params">>()
    const feeds = useAppSelector((state) => state.feed.feeds)

    const { feed } = route.params

    const dispatch = useAppDispatch()
    
    const navigation = useNavigation()

    const onSubmit = handleSubmit( (data) => {
        dispatch(updateFeed({ id: feed.id, newName: data.title }))

        navigation.goBack()
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Manage Feed Details",
            headerBackTitleVisible: false,

            headerRight: () => (

                <TouchableOpacity onPress={onSubmit}>
                    <Text style={globalStyles.headerRight}>Save</Text>
                </TouchableOpacity>    
            )
        })
    })

    //Check if title is the same as original OR it doesn't appear in unique
    const validateTitle = (value: string): boolean => {
        return value === feed.title || feeds.some((f) => f.title !== value)
    }

    return (
        <View style={styles.container}>

            <Text style={errors.title ? styles.error : [styles.label, { color: colors.text }]}>Title</Text>
            <Controller 
                control={control} 
                rules={{ required: true, validate: (value) => validateTitle(value) }}
                name="title"
                defaultValue={feed.title}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                        style={errors.title ? [styles.error_input, { backgroundColor: colors.card }] : [styles.input, { backgroundColor: colors.card, color: colors.text }]} 
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Title"
                        placeholderTextColor={inactiveTintColor(colors.text)}
                    />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8, 
        paddingHorizontal: 16, 
    },

    header: {
        fontWeight: "bold", 
        fontSize: 48, 
        marginBottom: 16
    },

    label: {
        fontSize: 18,
        fontWeight: "500",
        padding: 4,
        marginBottom: 8
    },

    input: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 20,
        fontSize: 16,
    },
    
    error_input: {
        fontSize: 16,
        padding: 16,
        marginBottom: 16,
        borderRadius: 20,
        borderColor: "red",
        borderWidth: 0.25,
    },

    error: {
        fontSize: 18,
        fontWeight: "500",
        color: "red",
        padding: 4,
        marginBottom: 8

    },

    
})

