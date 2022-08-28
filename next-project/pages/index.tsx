import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import CategoryCard from '../components/CategoryCard';
import { Category, GetCategoryResults } from '../types';


const Home: NextPage<{categories: Category[]}> = ({categories}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe</title>
        <meta name="description" content="A recipe finding app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto'>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10">
          {categories.map(category => {
            return (
              <CategoryCard key={category.idCategory} category={category}/>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  const {categories}: GetCategoryResults = await res.json();

  return {
    props: {
      categories: categories
    }
  }
}

export default Home;
