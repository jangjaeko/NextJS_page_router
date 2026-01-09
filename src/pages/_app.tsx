import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickBtn = () => {
    router.push("/test");
    // router.replace("/search");
  };
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href="/">index</Link> |<Link href="/search">search</Link> |{" "}
        <Link href="/book/1" prefetch={false}>
          book/1
        </Link>{" "}
        |{" "}
        <div>
          <button onClick={onClickBtn}>go test</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
