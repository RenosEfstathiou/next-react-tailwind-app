import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';

import CategoryCard from '../components/CategoryCard';
import { Category, GetCategoryResults } from '../types';


const Home: NextPage<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className={styles.container}>
      <div className='container mx-auto mt-10'>
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(category => {
            return (
              <CategoryCard key={category.idCategory} category={category} />
            );
          })}
        </div>
      </div>
    </div>
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
