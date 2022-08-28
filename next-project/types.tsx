export interface Category {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string
};

export interface Meal {
    strMeal: string,
    strMealThumb: string
    idMeal: string
}

export interface GetCategoryResults {
    categories: Category[]
}

export interface GetCategoryMealsResults {
    meals: Meal[]
}

export interface Ingredients {
    id: number
    name: string
    measure: string
}

export interface MealDetails {
    idMeal: string,
    strMeal: string,
    strDrinkAlternate: string,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strTags: string,
    strYoutube: string,
    strSource: string,
    strImageSource: string | null
    strCreativeCommonsConfirmed: string | null,
    ingredients: Array<Ingredients>
};