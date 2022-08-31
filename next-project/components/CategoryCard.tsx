import { NextPage } from "next"
import Image from 'next/image';
import Link from 'next/link';

import { Category } from "../types";

const CategoryCard: NextPage<{ category: Category }> = ({ category }) => {
    return (
        <div>
            <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <Image
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        width={100}
                        height={100}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div className="relative mt-4">
                    <h3 className="text-3xl text-center text-gray-900">{category.strCategory}</h3>
                </div>

                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-indigo-400 opacity-50"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <Link href={`/categories/${category.strCategory}`}>
                    <button
                        type="button"
                        className="rounded-md border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        View {category.strCategory} Meals
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CategoryCard