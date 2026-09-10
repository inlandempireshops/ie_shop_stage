import { shopifyFetch } from "@/lib/shopifyFetch";
import { ShopifyProductType } from "@/types/shopifyTypes";
import { GET_PRODUCT_QUERY } from "@/graphql/queries/products";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{ handle: string }>;
}

export default async function Product({ params }: Props) {
  const { handle } = await params;

  const response = await shopifyFetch<ShopifyProductType>({
    query: GET_PRODUCT_QUERY,
    variables: { handle }
  });

  const product = response?.data?.product;
  
  if(!product) {
    notFound()
  }

  return(
    <ProductClient product={product} />
  )
}