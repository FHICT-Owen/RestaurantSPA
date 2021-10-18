interface Category {
    id: number,
    name: string
}

interface Dish {
    id: number,
    name: string,
    description: string,
    image: string,
    category: string
}

interface PopUp {
    text: string
    isError: boolean
}
