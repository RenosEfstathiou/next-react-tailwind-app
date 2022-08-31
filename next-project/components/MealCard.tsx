import Image from 'next/image';
import Link from 'next/link';

import { Meal } from "../types";

const MealCard = ({ meal }: { meal: Meal }) => {
    return (
        <div className='flex flex-col justify-between'>
            <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <Image
                        src={meal.strMealThumb}
                        alt={`${meal.strMeal}_thumb`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>

                <div className="relative mt-4">
                    <h3 className="text-3xl text-center text-gray-900">{meal.strMeal}</h3>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <Link href={`/meals/${meal.idMeal}`}>
                    <button
                        type="button"
                        className="rounded-md border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        View Recipe
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default MealCard;