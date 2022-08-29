import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Image from  'next/image'

import { GetCategoryResults, GetCategoryMealsResults, MealDetails } from "../../types";

const RecipeDetailView:NextPage<{meal: MealDetails}> = ({meal}) => {
    return (
        <div className="max-w-[80%] lg:max-w-[50%] bg-white rounded-lg border border-gray-200 shadow-lg mx-auto mt-5">
            <p className="text-2xl font-bold text-center my-4 px-2">{meal.strMeal}</p>

            <Image src={meal.strMealThumb} alt={`${meal.strMeal}_thumb`} width='400' height='350' layout="responsive" />

            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">Ingredients:</h5>
                <ol className="space-y-1 max-w-md list-inside">
                    {meal.ingredients.map(ingredient => {
                        return (
                            <li key={ingredient.id} className="flex items-center">
                                {ingredient.name}  {ingredient.measure}
                            </li>
                        )
                    })}
                </ol>

                <h5 className="mb-2 text-2xl font-bold tracking-tight mt-5">Instructions:</h5>
                <p className="mb-3 font-normal">{meal.strInstructions}</p>
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async() => {
    const categoriesRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    const {categories}: GetCategoryResults = await categoriesRes.json();

    let mealIds: Array<string> = [];

    await Promise.all(categories.map(async category => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);

            const {meals}: GetCategoryMealsResults = await res.json();

            meals.map(meal => {
                mealIds.push(meal.idMeal);
            })
        } catch (error) {
            console.log(error);
        }
    }));

    return {
        paths: mealIds.map((id) => {
            return { params: { id: String(id) } };
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async(context) => {
    const params = context.params!;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);

    const {meals} = await res.json();

    let meal = meals[0];
    meal.ingredients = [];

    for (let ingredient = 1; ingredient <= 20; ingredient++) {
      if (meal[`strIngredient${ingredient}`]) {
            meal.ingredients.push({
                id: ingredient,
                name: meal[`strIngredient${ingredient}`],
                measure: meal[`strMeasure${ingredient}`]
            });
      }

      delete meal[`strIngredient${ingredient}`];
      delete meal[`strMeasure${ingredient}`];
    }

    return {
        props: {
            meal: meal
        }
    }
}

export default RecipeDetailView;
