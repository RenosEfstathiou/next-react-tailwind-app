import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';

import CategoryCard from '../components/CategoryCard';
import { Category, GetCategoryResults } from '../types';
import Image from 'next/image';
import Link from 'next/link'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';


const Home: NextPage<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className={styles.container}>
      <div className='container mx-auto'>
        <main className="lg:relative mb-10">
          <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Welcome to Recipe </span>
                <span className="block text-indigo-600 xl:inline">a recipe finding app.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                You can search for your desired meal through our categories below or search for it my meal name using our search bar!
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="flex flex-1 items-center justify-start">
                  <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-indigo-300 bg-white py-4 pl-10 pr-3 leading-5 placeholder-indigo-500 focus:border-indigo-500 focus:placeholder-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-900 sm:text-sm"
                        placeholder="Search meal..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    href="#categories"
                  >
                    <span className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base text-indigo-600 hover:bg-gray-50">
                      View Categories
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image src="/home_illustration.jpg" width={100} height={100} layout='responsive' objectFit='fill' />
          </div>
        </main>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-xl font-bold text-gray-900">Categories:</h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {categories.map((category) => (
                <CategoryCard key={category.idCategory} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  const { categories }: GetCategoryResults = await res.json();

  return {
    props: {
      categories: categories
    }
  }
}

export default Home;
