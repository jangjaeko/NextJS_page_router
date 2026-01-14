import { useRouter } from "next/router"; // for page router
import SearchableLayout from "@/components/searchable-layout";
// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import Head from "next/head";
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // console.log("context:", context);
  const q = context.query.q;
  const books = await fetchBooks(q as string);
  return {
    props: { books },
  };
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { books } = props;
  const router = useRouter();
  console.log("router:", router);
  // const { name } = router.query;

  return (
    <div>
      <Head>
        <title>Books search result</title>
        <meta property="og:image" content="/og-image-home.png" />
        <meta property="og:title" content="Books Page" />
        <meta property="og:description" content="A collection of books" />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
