import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = React.useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const router = useRouter();
  const name = router.query.name as string;
  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?name=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  useEffect(() => {
    setSearch(name || "");
  }, [name]);
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          type="text"
          placeholder="Search..."
        />
        <button onClick={onSubmit}>Search</button>
      </div>
      <div>{children}</div>
    </div>
  );
}
