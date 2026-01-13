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

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { book } = props;

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
