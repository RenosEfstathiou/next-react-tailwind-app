import { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/router'

import { GetCategoryMealsResults, Meal } from "../../types";

import MealCard from "../../components/MealCard";

const CategoryMeals: NextPage<{meals: Meal[]}> = ({meals}) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1 className="text-4xl text-center mb-3">{id} Meals</h1>
            <div className='container mx-auto'>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10 mb-5">
                    {meals && meals.map(meal => <MealCard key={meal.idMeal} meal={meal}/>)}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params!;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.id}`);

    const {meals}: GetCategoryMealsResults = await res.json();

    return { props: { meals } };
}

export default CategoryMeals;