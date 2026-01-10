import { useRouter } from "next/router"; // for page router
import SearchableLayout from "@/components/searchable-layout";
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

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
