import { useRouter } from "next/router"; // for page router

export default function Page() {
  const router = useRouter();
  console.log("router:", router);
  const { name } = router.query;

  return (
    <div>
      <h1>name: {name}</h1>
    </div>
  );
}
