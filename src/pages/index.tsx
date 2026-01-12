import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";

import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]); // working in parallel

  return {
    props: {
      allBooks,
      recommendBooks,
    },
  };
}; // make this page ssr & only work on server side

export default function Home({
  allBooks,
  recommendBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("allBooks:", allBooks);
  return (
    <div>
      <section className={style.container}>
        <h3>Now recommending</h3>
        {recommendBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section className={style.container}>
        <h3>registered books</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
