import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";

import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import BookData from "@/types";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]); // working in parallel

  return {
    props: {
      allBooks,
      recommendBooks,
    },
    revalidate: 10, // in seconds
  };
}; // make this page ssr & only work on server side

export default function Home({
  allBooks,
  recommendBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Books Home</title>
        <meta property="og:image" content="/og-image-home.png" />
        <meta property="og:title" content="Books Page" />
        <meta property="og:description" content="A collection of books" />
      </Head>
      <div>
        <section className={style.container}>
          <h3>Now Recommending</h3>
          {recommendBooks.map((book: BookData) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section className={style.container}>
          <h3>Registered Books</h3>
          {allBooks.map((book: BookData) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
