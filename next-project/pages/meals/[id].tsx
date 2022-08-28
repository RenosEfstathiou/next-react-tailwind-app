import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Image from  'next/image'

import { GetCategoryResults, GetCategoryMealsResults, MealDetails } from "../../types";

const RecipeDetailView:NextPage<{meal: MealDetails}> = ({meal}) => {
    return (
      <div>
        {/* header with the meal title and back button */}
            {meal.strMeal}
        {/* image on the left side and ingr on the right*/}
        <Image src={meal.strMealThumb} width='400' height='500' alt={meal.strMeal}/>
        {meal.ingredients.map(ingredient => {
            return (<p key={ingredient.id}>{ingredient.name} {ingredient.measure}</p>)
        })}

        {meal.strInstructions}
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
