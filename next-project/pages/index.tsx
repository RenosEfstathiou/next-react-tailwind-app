import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';


interface Props {
  categories : Array<Category>
}

interface Category {
  idCategory: string,
  strCategory: string,
  strCategoryThumb: string,
  strCategoryDescription: string
}

const Home: NextPage<Props> = ({categories}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto'>



          {/* crete a category card  and render it inside a row so that it is responsive*/}
          {categories.map(category => {
            return (
              <div key={category.idCategory}>
                <Image src={category.strCategoryThumb} alt={`${category.strCategory}_thumb`} width='280' height='280' />
                <h1 className=''>{category.strCategory}</h1>
                <Link href={`/meals/category/${category.idCategory}`}><button className='button'>Hello</button></Link>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  const {categories} = await res.json();

  return {
    props: {
      categories: categories
    }
  }
}

export default Home;