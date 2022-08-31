import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Image from 'next/image'

import { GetCategoryResults, GetCategoryMealsResults, MealDetails } from "../../types";

import { StarIcon as StarIconOutlined } from '@heroicons/react/24/outline'
import IngredientsList from "../../components/IngredientsList";
import Link from "next/link";

const RecipeDetailView: NextPage<{ meal: MealDetails }> = ({ meal }) => {
    return (
        <main className="flex-1">
            <div className="py-8 xl:py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
                    <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
                        <div>
                            <div>
                                <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h1>

                                    </div>
                                    <div className="mt-4 flex space-x-3 md:mt-0">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-yellow-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <StarIconOutlined className="-ml-1 mr-2 h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            <span>Favorite</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="my-5 rounded-lg overflow-hidden">
                                    <Image src={meal.strMealThumb} alt={`${meal.strMeal}_thumb`} width={100} height={100} layout="responsive" objectFit="contain" />
                                </div>
                                <aside className="mt-8 xl:hidden">
                                    <h2 className="text-2xl font-bold mb-2">Ingredients:</h2>
                                    <div className="space-y-5">
                                        <IngredientsList ingredients={meal.ingredients} />
                                    </div>

                                    <div className="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-500">Tags</h2>
                                            <ul role="list" className="mt-2 leading-8">
                                                <li className="inline">
                                                    <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                                                        <div className="absolute flex flex-shrink-0 items-center justify-center">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                                                        </div>

                                                        <div className="ml-3.5 text-sm font-medium text-gray-900">{meal.strArea}</div>
                                                    </div>
                                                </li>
                                                <li className="inline ml-2">
                                                    <Link
                                                        href={`/categories/${meal.strCategory}`}
                                                    >
                                                        <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 hover:bg-indigo-50 cursor-pointer">
                                                            <div className="absolute flex flex-shrink-0 items-center justify-center">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                                                            </div>

                                                            <div className="ml-3.5 text-sm font-medium text-gray-900">{meal.strCategory}</div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                                <div className="py-3 xl:pt-6 xl:pb-0">
                                    <h2 className="mb-2 text-2xl font-medium">Instructions:</h2>
                                    <p>
                                        {meal.strInstructions}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <aside className="hidden xl:block xl:pl-8">
                        <h2 className="text-2xl font-bold mb-2">Ingredients:</h2>
                        <div className="space-y-5">
                            <IngredientsList ingredients={meal.ingredients} />
                        </div>
                        <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                            <div>
                                <h2 className="text-sm font-medium text-gray-500">Tags</h2>
                                <ul role="list" className="mt-2 leading-8">
                                    <li className="inline">
                                        <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                                            <div className="absolute flex flex-shrink-0 items-center justify-center">
                                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                                            </div>

                                            <div className="ml-3.5 text-sm font-medium text-gray-900">{meal.strArea}</div>
                                        </div>
                                    </li>

                                    <li className="inline ml-2">
                                        <Link
                                            href={`/categories/${meal.strCategory}`}
                                        >
                                            <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 hover:bg-indigo-50 cursor-pointer">
                                                <div className="absolute flex flex-shrink-0 items-center justify-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                                                </div>

                                                <div className="ml-3.5 text-sm font-medium text-gray-900">{meal.strCategory}</div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div >
        </main >
    );
}



export const getStaticPaths: GetStaticPaths = async () => {
    const categoriesRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    const { categories }: GetCategoryResults = await categoriesRes.json();

    let mealIds: Array<string> = [];

    await Promise.all(categories.map(async category => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);

            const { meals }: GetCategoryMealsResults = await res.json();

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

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params!;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);

    const { meals } = await res.json();

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
