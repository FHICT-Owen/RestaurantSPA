interface Category {
    id: number,
    name: string
}

interface Dish {
    id: number,
    name: string,
    description: string,
    category: string,
    ingredients: string[]
    image: string,
}

interface Ingredient {
    id: number,
    name: string,
    isAllergen: boolean
}

interface PopUp {
    text: string
    isError: boolean
}
