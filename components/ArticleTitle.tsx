import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { Article } from '../types'
import { useTheme } from '@react-navigation/native';
import { inactiveTintColor } from '../navThemes';

interface ArticleTitleProps{
    article: Article
}

export default function ArticleTitle({ article }: ArticleTitleProps) {

    const { colors } = useTheme()

    const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(null)

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
        <TouchableOpacity style={styles.container} onPress={handleLink}>
            <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>

            <Text style={[styles.author, { color: inactiveTintColor(colors.text) }]} numberOfLines={1}>{getAuthor() + " / " + article.published}</Text>

            { (article.description && article.description !== "null") &&
                <Text style={[styles.description, { color: inactiveTintColor(colors.text) }]} numberOfLines={3}>{getPlaintext(article.description.trim())}</Text>
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { 
        marginVertical: 16,
    },

    title: {
        fontWeight: "bold", 
        fontSize: 16, 
        marginBottom: 4
    },

    author: {
        fontSize: 14, 
        marginBottom: 4
    },

    description: {
        fontSize: 14, 
        marginBottom: 8
    },


})
