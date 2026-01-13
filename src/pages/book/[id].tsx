// catch all segment
// ad [...id] matches /book/a, /book/a/b, /book/a/b/c, etc.
// add [[]] to make it optional => matches /book as well
import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  // InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-oneBook";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // fallback: "blocking", // can also use ssr for non-predefined paths & after that cache it for next time it works like ssg
    // fallback: false, // other paths will 404
    fallback: true, // show loading state first, then ssr, skip getStaticProps logics and then just give props to the page
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { book } = props;
  if (router.isFallback) return <>Loading...</>;
  if (!book) return <>No book found</>;

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url(${coverImgUrl})` }}
        className={style.cover_img_container}
      >
        <img src={coverImgUrl} alt={title} width={300} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
