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

import { ChevronDownIcon } from '@heroicons/react/20/solid';


const Header = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);

  const fetchCategories = useCallback(async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    const { categories }: GetCategoryResults = await res.json();

    setCategories(categories);
    window.localStorage.setItem('categories', JSON.stringify(categories));
  }, []);

  useEffect(() => {
    let categoriesFromStorage = window.localStorage.getItem('categories');

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Popover className="sticky z-10 bg-white top-0 left-0 border-b">
        <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none'
                    )}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
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
                    <Popover.Panel className="absolute z-10 -ml-4 mt-8 w-screen max-w-md transform lg:left-1/2 lg:ml-0 lg:max-w-xl lg:-translate-x-[32.5rem]">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll h-[30rem]">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                          {categories.map((category) => (
                            <Link
                              key={category.idCategory}
                              href={`/categories/${category.strCategory}`}
                            >
                              <div className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                                <div className="h-[80px] w-[80px] items-center justify-center rounded-md text-white shadow">
                                  <Image src={category.strCategoryThumb} width='100' height='100' layout="responsive" objectFit="cover" alt={`${category.strCategory}_thumb`} />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base text-2xl font-bold text-gray-900">{category.strCategory}</p>
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
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-7">a
                    {categories.map((category) => (
                      <Link
                        key={category.idCategory}
                        href={`/categories/${category.strCategory}`}

                      >
                        <div className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">

                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{category.strCategory}</div>
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
