import { useRouter } from "next/router";
import React from "react";

type Props = {};

function CategoryPage({}: Props) {
  const router = useRouter();

  const { category } = router.query;
  return <div>{category}</div>;
}

export default CategoryPage;
