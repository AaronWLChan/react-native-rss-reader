import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { Article } from '../types'
import { useTheme } from '@react-navigation/native'
import { inactiveTintColor } from '../navThemes'
import unescape from 'lodash/unescape'

interface ArticleItemProps{
    article: Article
}

export default function ArticleItem( { article }: ArticleItemProps) {

    const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(null)

    const { colors } = useTheme()

    const handleLink = async () => {

        if (article.link && article.link[0].url) {
            let result = await WebBrowser.openBrowserAsync(article.link[0].url)
            setResult(result)
        }


    }

    const getAuthor = () => {

        if (article.authors instanceof Array){
            return article.authors.map((author) => author.name).toString()
        }

        else {
            return article.authors as String
            
        }
    }


    const getPlaintext = (html: string) => {

        return unescape(html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '))
    }

    return (
        <TouchableOpacity 
        onPress={handleLink}
        style={styles.container}>

        
   
        <View style={styles.text_container}>

            <View style={styles.row}>
                <Text style={[styles.author, { color: inactiveTintColor(colors.text) }]} numberOfLines={1}>{getAuthor() + " / " + article.published}</Text>
            </View>

            <Text style={[styles.title, { color: colors.text } ]} numberOfLines={2}>{article.title}</Text>

            { (article.description && article.description !== "null") &&
                <Text style={[styles.description, { color: inactiveTintColor(colors.text) }]} numberOfLines={2}>{getPlaintext(article.description.trim())}</Text>
            }


        </View>

        {article.image && 
            <Image source={{uri: article.image}} style={styles.image} resizeMode='cover'/>
        }



    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: { 
        marginTop: 16,
        marginBottom: 16, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: "flex-start"
    },

    text_container: { 
        flex: 1,
        marginRight: 12, 

    },

    image: {
        width: 120, 
        height: '100%', 
        borderRadius: 10
    },

    row: { 
        flexDirection:'row', 
        justifyContent: 'space-between'
     },

    author: {
        fontSize: 14, 
        marginBottom: 4
    },


    title: {
        fontWeight: "bold", 
        fontSize: 16, 
        marginBottom: 4
    },

    description: {
        fontSize: 14, 
        marginBottom: 8
    },


})
