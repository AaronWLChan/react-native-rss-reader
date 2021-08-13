

const FEED_CATEGORIES = {

    SPORT: {
        name: "sport",
        colour: "rgba(254, 87, 56, 0.75)",
        imageURL: require("../assets/images/sport.jpg")
    },

    NEWS: {
        name: "news",
        colour: "rgba(52, 199, 89, 0.75)",
        imageURL: require("../assets/images/news.jpg")

    },

    HEALTH: {
        name: "health",
        colour: "rgba(0, 122, 255, 0.75)",
        imageURL: require("../assets/images/health.jpg")

    },

    TECH: {
        name: "technology",
        colour: "rgba(255, 179, 64, 0.75)",
        imageURL: require("../assets/images/tech.jpg")

    },

    BUSINESS: {
        name: "business",
        colour: "rgba(255, 212, 38, 0.75)",
        imageURL: require("../assets/images/business.jpg")

    },

    
    SCIENCE: {
        name: "science",
        colour: "rgba(125, 122, 255, 0.75)",
        imageURL: require("../assets/images/science.jpg")

    },

}

export const FEED_CATEGORY_ARRAY = [
    FEED_CATEGORIES.SPORT,
    FEED_CATEGORIES.HEALTH,
    FEED_CATEGORIES.NEWS,
    FEED_CATEGORIES.TECH,
    FEED_CATEGORIES.BUSINESS,
    FEED_CATEGORIES.SCIENCE
]

export default FEED_CATEGORIES