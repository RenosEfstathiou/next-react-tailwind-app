import { useEffect } from "react";

import { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css';

import { GetCategoryMealsResults, Meal } from "../../types";

import MealCard from "../../components/MealCard";

const CategoryMeals: NextPage<{ meals: Meal[] }> = ({ meals }) => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!meals) {
            router.push('/404')
        }
    })

    return (
        <div className={styles.container}>
            <div className="container mx-auto">
                {meals &&
                    <div>
                        <h1 className="text-4xl text-center my-3">{id} Meals</h1>

                        <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                            <div className="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                {meals && meals.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params!;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.id}`);

    const { meals }: GetCategoryMealsResults = await res.json();


    return { props: { meals } };
}

export default CategoryMeals;