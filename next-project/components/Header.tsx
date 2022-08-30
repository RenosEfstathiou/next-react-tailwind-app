import { useEffect, useState, useCallback } from "react";

import Head from 'next/head';
import Link from "next/link";
import Image from "next/image";

import { Category, GetCategoryResults } from '../types';

import { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react'

import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);

  const fetchCategories = useCallback(async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    const { categories }: GetCategoryResults = await res.json();

    setCategories(categories);
    window.localStorage.setItem('categories', JSON.stringify(categories));
  }, []);

  useEffect(() => {
    let categoriesFromStorage: string | null = window.localStorage.getItem('categories');

    if (!categoriesFromStorage) {
      fetchCategories();
    } else {
      setCategories(JSON.parse(categoriesFromStorage));
    }

  }, [fetchCategories]);

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
  };

  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name="description" content="A recipe finding app" />
        <link rel="icon" href="/recipe.png" />
      </Head>

      <Popover className="sticky z-10 bg-white top-0 left-0 border-b">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6  md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              href="/"
            >
              <Image src='/recipe.png' width={50} height={50} className="cursor-pointer"></Image>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
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
                  className="block w-full rounded-md border border-indigo-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-indigo-500 focus:border-indigo-500 focus:placeholder-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-900 sm:text-sm"
                  placeholder="Search meal..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-indigo-500' : 'text-indigo-900',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-indigo-500 focus:outline-none'
                    )}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-indigo-500' : 'text-indigo-900',
                        'ml-2 h-5 w-5 group-hover:text-indigo-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-8 w-screen max-w-md transform lg:left-1/2 lg:ml-0 lg:max-w-xl lg:-translate-x-[32.5rem] md:left-1/2 md:ml-0 md:max-w-xl md:-translate-x-[32.5rem]">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll h-[30rem]">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 md:grid-cols-2 lg:grid-cols-2">
                          {categories.map((category) => (
                            <Link
                              key={category.idCategory}
                              href={`/categories/${category.strCategory}`}
                            >
                              <div className="-m-3 flex items-center rounded-lg p-3 hover:bg-indigo-50 cursor-pointer">
                                <div className="h-[80px] w-[80px] items-center justify-center rounded-md text-white shadow">
                                  <Image src={category.strCategoryThumb} width={100} height={100} layout="responsive" objectFit="contain" alt={`${category.strCategory}_thumb`} />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base text-2xl font-bold text-indigo-900">{category.strCategory}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute inset-x-0 z-10 top-0 origin-top-right transform p-2 transition md:hidden">
            <div className="divide-y-2 divide-indigo-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                  >
                    <Image src='/recipe.png' width={50} height={50} className="cursor-pointer"></Image>
                  </Link>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-7 overflow-hidden overflow-y-scroll h-[80vh]">
                    {categories.map((category) => (
                      <Link
                        key={category.idCategory}
                        href={`/categories/${category.strCategory}`}

                      >
                        <div className="-m-3 flex items-center rounded-lg p-3 hover:bg-indigo-50">
                          <div className="h-24 w-24 flex-shrink-0 items-center justify-center rounded-md text-white">
                            <Image src={category.strCategoryThumb} width={24} height={24} layout="responsive" objectFit="cover" alt={`${category.strCategory}_thumb`} />
                          </div>
                          <div className="ml-4 text-base font-medium text-indigo-900">{category.strCategory}</div>
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

    </>
  );
};

export default Header;
