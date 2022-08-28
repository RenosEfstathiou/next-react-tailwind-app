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
