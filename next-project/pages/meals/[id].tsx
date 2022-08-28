import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Image from  'next/image'

import { GetCategoryResults, GetCategoryMealsResults, MealDetails } from "../../types";

const RecipeDetailView:NextPage<{meal: MealDetails}> = ({meal}) => {
    return (
        <div className="container mx-auto card pt-5">
            <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <div>
                    {/* header with the meal title and back button */}
                    <p className="text-3xl font-bold mb-4">{meal.strMeal}</p>
                </div>

                <div className="flex flex-row">
                    {/* image on the left side and ingr on the right*/}
                    <Image src={meal.strMealThumb} width='400' height='500' alt={meal.strMeal} className='grow-0'/>


                    <div className="overflow-x-auto relative">
                        <table className="text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="py-3 px-6 rounded-l-lg">
                                        Ingredient
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Measure
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {meal.ingredients.map(ingredient => {
                                    return (
                                        <tr className="bg-white mx-auto" key={ingredient.id}>
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                {ingredient.name}
                                            </th>

                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                {ingredient.measure}
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    {meal.strInstructions}
                </div>
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
