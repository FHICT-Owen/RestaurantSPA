interface Category {
    id: number
    name: string
}

interface Dish {
    id: number
    name: string
    description: string
    category: string
    image: string
}

interface PopUp {
    text: string
    isError: boolean
}
