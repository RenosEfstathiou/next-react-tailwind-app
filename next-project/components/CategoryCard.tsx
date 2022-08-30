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
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>

                <div className="relative mt-4">
                    <h3 className="text-2xl text-center text-gray-900">{category.strCategory}</h3>
                </div>

                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                </div>
            </div>

            <div className="mt-6">
                <Link href={`/categories/${category.strCategory}`}>
                    <p className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
                        View {category.strCategory} Meals
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default CategoryCard