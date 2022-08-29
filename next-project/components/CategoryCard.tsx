import Image from 'next/image';
import Link from 'next/link';

import { Category } from "../types";

const CategoryCard = ({category}: {category: Category}) => {
  return (
    <div className="flex flex-col justify-between max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 cursor-pointer">
            <Link href={`/categories/${category.strCategory}`}>
                <Image
                    src={category.strCategoryThumb}
                    alt={`${category.strCategory}_thumb`}
                    width='350'
                    height='300'
                    layout="responsive"
                    />
            </Link>
        </div>


        <Link href={`/categories/${category.strCategory}`}>
            <h5 className="text-2xl text-center font-bold tracking-tight cursor-pointer mt-3">{category.strCategory}</h5>
        </Link>

        <div className="flex justify-center md:justify-end m-3">
            <Link href={`/categories/${category.strCategory}`}>
                <button type="button" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View Meals
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default CategoryCard