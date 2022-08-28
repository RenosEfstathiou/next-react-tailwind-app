import { NextPage } from "next"
import Image from 'next/image';
import Link from 'next/link';

import { Category } from "../types";

const CategoryCard: NextPage<{category: Category}> = ({category}) => {
  return (
    <div className="w-full max-w-sm rounded-md bg-gray-800 border-4 border-orange-600">
        <Link href={`/categories/${category.strCategory}`}>
            <Image src={category.strCategoryThumb} alt={`${category.strCategory}_thumb`} width='350' height='300' layout="responsive" className="cursor-pointer" />
        </Link>

        <div className="px-5 pt-5 pb-1">
            <Link href={`/categories/${category.strCategory}`}>
                <h5 className="text-3xl text-center font-semibold tracking-tight text-white cursor-pointer">{category.strCategory}</h5>
            </Link>

            <div className="flex justify-end items-center mt-3">
                <Link href={`/categories/${category.strCategory}`}><button className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View {category.strCategory} Meals</button></Link>
            </div>
        </div>
    </div>
  )
}

export default CategoryCard