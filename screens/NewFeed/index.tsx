import React, { useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { addFeed } from '../../redux/feedSlice'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../../navThemes'
import globalStyles from '../../styles/globalStyles'

type Form = {
    title: string,
}

export default function NewFeed() {

    const { colors } = useTheme()

    const navigation = useNavigation()
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm<Form>()

    const onSubmit = handleSubmit((data) => {

        dispatch(addFeed({
            id: uuidv4(),
            title: data.title,
            feedProviders: []
        }))

        navigation.goBack()
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add Provider",
            headerBackTitleVisible: false,

            headerLeft: () => null,

            headerRight: () => (

                <TouchableOpacity onPress={onSubmit}>
                     <Text style={globalStyles.headerRight}>Save</Text>
                </TouchableOpacity>    

            )
        })
    }, [])

    const feeds = useAppSelector((state) => state.feed.feeds)

    return (
        <View style={styles.container}>

            <Text style={errors.title ? styles.error : [styles.label, { color: colors.text }]}>Title</Text>
            <Controller 
                control={control} 
                rules={{ required: true, validate: (value) => !feeds.some((f) => f.title.toLowerCase() === value.toLowerCase()) }}
                name="title"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                        placeholderTextColor={inactiveTintColor(colors.text)}
                        style={errors.title ? [styles.error_input, { backgroundColor: colors.card }] : [styles.input, { backgroundColor: colors.card }]} 
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Title"
                    />
                )}
            />
            { errors.title?.type === "validate" &&
                <Text style={errors.title ? styles.error : [styles.label, { color: colors.text }]}>Feed with this title already exists.</Text>
            }

        </View>
    )
}
