import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickBtn = () => {
    router.push("/search");
    // router.replace("/search");
  };
  return (
    <>
      <header>
        <Link href="/">index</Link> |<Link href="/search">search</Link> |{" "}
        <Link href="/book/1">book/1</Link> |{" "}
        <div>
          <button onClick={onClickBtn}>search</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
