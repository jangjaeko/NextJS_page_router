import { useRouter } from "next/router";
// catch all segment
// ad [...id] matches /book/a, /book/a/b, /book/a/b/c, etc.
// add [[]] to make it optional => matches /book as well
export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>book {id}</h1>
    </div>
  );
}
