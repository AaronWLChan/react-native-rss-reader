import { Article, SortMode } from '../types'
import { parse } from 'rss-parserr'

export default async function parse2(xmlObjects: string[], providerNames: string[], sortMode?: SortMode, filter?: "today" ){

    //Return object
    let articles: Article[] = []

    for (let i = 0; i < xmlObjects.length; i++){

        let xml = xmlObjects[i]

        try {
            const result = await parse(xml)

            let items = result.items
            const len = items.length

            for (let j = 0; j < len; j++){

                let item = items[j]

                articles.push({
                    title: item.title,
                    authors: (item.authors && item.authors.length > 0) ? item.authors : providerNames[i],
                    description: item.description || item.content,
                    link: item.links,
                    published: item.published,
                    image: item.imageUrl,
                    publisherImage: result.image.url
                })
            }
          
        }

        catch (e){
            console.log("Failed to parse feed. Error: " + e)
        }

    }

    //Sort them by pubDate (millis)
    articles.sort((a, b) => {

        if (a.published && b.published) {
            let dateA = new Date(a.published)
            let dateB = new Date(b.published)

            return sortMode === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
        }

        return 0
    })

    //Apply filter
    if (filter) {
        articles = applyFilter(filter, articles)
    }


    //Convert time into human-readable format
    articles = articles.map((article) => (
        {
            ...article,
            published: formatDate(article.published!)
        }
    ))


    return articles

}


function formatDate(pubDate: string){
    //Determine if same day
    const today = new Date()
    const date = new Date(pubDate)

    //If today (since rss feeds are very recent, should only need to test DD value) 
    let daysDifference = Math.round( (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDifference === 0){

        //Find time (minutes or hours) elapsed
        let millisDifference = today.getTime() - date.getTime()

        let hours = Math.floor(millisDifference / 1000 / 60 / 60)
        millisDifference -= hours * 1000 * 60 * 60

        let minutes = Math.floor(millisDifference / 1000 / 60)

        //How accurate do u wan?
        if (hours >= 1){
            return hours + "h"
        }

        else {
            return minutes + "m"
        }

    }

    //Else find how many days ag
    return daysDifference.toFixed() + "d"
}

function applyFilter(filter: string, articles: Article[]){


    if (filter === "today") {

        //Today at 12 am
        const startOfTodayinMillis = new Date(new Date().setHours(0, 0, 0, 0)).getTime()

        return articles.filter((article) => {

            if (article.published) {
                let articleTimeinMillis = new Date(article.published).getTime()

                return articleTimeinMillis - startOfTodayinMillis >= 0
            }

            return false

        })

    }



    return articles
}