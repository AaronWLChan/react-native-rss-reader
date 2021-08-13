import { ImageSourcePropType } from "react-native"
import { Author, Link, Maybe } from "rss-parserr/lib/types"

export interface FeedCategory {
    name: string,
    colour: string,
    imageURL: ImageSourcePropType,
}

export interface Article {
    authors: Author[] | string,
    title?: string,
    description?: string,
    link?: Link[],
    published?: string,
    image: Maybe<string>,
    publisherImage: Maybe<string>

}

export interface Feed {
    id: string,
    title: string,
    feedProviders: FeedlyProvider[]
}


export type ReadingMode = "card" | "title-only"

export type SortMode = "asc" | "desc"

export interface FeedlyProvider {
    feedId: string,
    subscribers: number,
    title: string,

    //Optional Fields
    description?: string,
    website?: string,
    lastUpdated?: number,
    velocity?: number,
    language?: string,
    featured?: boolean,
    iconUrl?: string,
    visualUrl?: string,
    coverUrl?: string,
    logo?: string,
    curated?: boolean,
    partial?: boolean,
    contentType?: string,
    coverColor?: string, 
    deliciousTags?: string[],
    topics?: string[],
}

export interface FeedlyQueryResponse {
    hint: string,
    related: string[],
    results: FeedlyProvider[]
}

