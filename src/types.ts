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

interface RestaurantTable {
    id: number,
    tableNumber: number,
    restaurantId: number,
    isActive: boolean,
    inUse: boolean
}