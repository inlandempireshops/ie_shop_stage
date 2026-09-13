"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiArrowLongLeft } from "react-icons/hi2";
import { ShopifyProductType } from "@/types/shopifyTypes";
import { notFound } from "next/navigation";
import { useCart } from "@/components/CartContext";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/utils";

type SingleShopifyImageType = {
  node: {
    url: string;
    altText: string;
  }
};

type ProductVariantType = {
  node: {
    id: string;
    title: string;
    availableForSale?: boolean | null;
    quantityAvailable?: number;
    price: {
      amount: string;
      currencyCode: string;
    };
    sellingPlanAllocations?: {
      nodes:
        Array<{
          sellingPlan: {
            id: string;
            name: string;
            description: string | null;

          }
        }>
    }
  }
}

export default function ProductClient({ product }: ShopifyProductType) {
  if(!product) {
    notFound();
  };

  const [imageIndex, setImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const title = product.title;
  const mainProductImage = product.images?.edges[imageIndex]?.node;
  const variantList = (product.variants?.edges || []) as ProductVariantType[];
  const hasMultipleSizes = product.options[0]?.values && product.options[0].values.length > 0;
  
  const currentActiveVariant = variantList.find((edge) => edge.node.title === selectedSize) || variantList[0];
  const price = currentActiveVariant?.node?.price;
  const isSizeSelected = hasMultipleSizes ? selectedSize !== "" : true;

  const isOutOfStock = isSizeSelected && currentActiveVariant 
    ? !currentActiveVariant.node.availableForSale || (currentActiveVariant.node.quantityAvailable !== undefined && currentActiveVariant.node.quantityAvailable <= 0) 
    : false;
  
  const k1PreOrderPlanId = currentActiveVariant?.node?.sellingPlanAllocations?.nodes?.[0]?.sellingPlan?.id;
  const preOrderDescription = currentActiveVariant?.node?.sellingPlanAllocations?.nodes?.[0]?.sellingPlan?.description;
  
  // Create options for select size dropdown
  const selectSizes = variantList.map((variant: ProductVariantType, index: number) => {
    const option = variant?.node?.title;
    return(
      <option value={option} key={index}>
        {`Size: ${option}`}
      </option>
    )
  });

  // Create array of all images from product
  const variantImages = product.images.edges.map((image: SingleShopifyImageType, index: number) => {
    return(
      <div 
        className="variant-image-container" 
        key={index}
        onClick={() => setImageIndex(index)}
      >
        <Image 
          src={image.node.url}
          alt={image.node.altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="variant-images"
        />
      </div>
    )
  });

  return(
    <main id="main-product-content">
      <Link
        href={"/shop"}
        className="back-to-link"
      >
        <HiArrowLongLeft className="back-to-icon"/>
        Back to shop
      </Link>

      <div className="product-container">
          <section className="product-info">
            <div className="product-title">
              <p>{title}</p>
            </div>
            <div className="product-price">
              <p className="price-amount">{formatPrice(price.amount, price.currencyCode)}</p>
            </div>
          </section>
        <div className="product-content-card-container">
          <div className="product-image-container">
            <Image 
              src={mainProductImage.url}
              alt={mainProductImage.altText}
              className="product-main-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="product-variant-image-grid">
            {variantImages}
          </div>
        </div>
        <div className="product-page-btns">
          {hasMultipleSizes && <div className="sizes-container">
            <label htmlFor="select-sizes" className="sr-only">Select a size:</label>
            <select
              name="select-sizes"
              id="select-sizes" 
              className="sizes-dropdown"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option
                value=""
                disabled
              >
                Select a size: 
              </option>
              {selectSizes}
            </select>
            <IoMdArrowDropdown className="drop-arrow"/>
          </div>}
          
          {
            isOutOfStock && k1PreOrderPlanId && (
              <p style={{ color: '#d97706', fontSize: '0.825rem', marginBlock: '8px', fontWeight: 500 }}>
                ✦ {preOrderDescription || "Item available via pre-order."}
              </p>
            )
          }
          <AddToCartButton 
            variantId={isSizeSelected ? currentActiveVariant?.node?.id : undefined}
            disabled={(hasMultipleSizes && !selectedSize) || (isOutOfStock && !k1PreOrderPlanId)}
            sellingPlanId={isOutOfStock ? k1PreOrderPlanId : undefined}
          />
        </div>
      </div>
    </main>
  )
}