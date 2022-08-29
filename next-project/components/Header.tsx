import { useEffect, useState, useCallback} from "react";

import Head from 'next/head';
import Link from "next/link";

import {Category, GetCategoryResults} from '../types';


const Header = () => {
  const [categories, setCategories]= useState<Array<Category>>([]);

  const fetchCategories = useCallback(async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    const {categories}: GetCategoryResults = await res.json();

    setCategories(categories);
    window.localStorage.setItem('categories', JSON.stringify(categories));
  }, []);

  useEffect(()=> {
    let categoriesFromStorage = window.localStorage.getItem('categories');

    if (!categoriesFromStorage) {
      fetchCategories();
    } else {
      setCategories(JSON.parse(categoriesFromStorage));
    }

  }, [fetchCategories])
  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name="description" content="A recipe finding app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className='px-2 bg-white bg-gray-900 border-gray-200 border-gray-700 sticky top-0 z-50'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <Link href='/'>
            <span className='self-center text-xl font-semibold whitespace-nowrap text-white cursor-pointer'>Recipe</span>
          </Link>
          <button
            data-collapse-toggle='mobile-menu'
            type='button'
            className='inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300'
            aria-controls='mobile-menu-2'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>

          <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
            <ul className='flex flex-col p-4 mt-4 rounded-lg  bg-gray-900 border-gray-700border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0'>
              <li className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent'>
                <Link
                  href='/'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  id='dropdownNavbarLink'
                  data-dropdown-toggle='dropdownNavbar'
                  className='flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                >
                  Categories
                  <svg
                    className='ml-1 w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
                <div
                  id='dropdownNavbar'
                  className='hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                >
                  <ul className='py-1 text-sm text-gray-700 dark:text-gray-400' aria-labelledby='dropdownLargeButton'>
                    {categories && categories.map(category => {
                      return (
                        <li key={category.idCategory}>
                          <Link
                            href={`/categories/${category.strCategory}`}
                          >
                            <span className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>{category.strCategory}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
