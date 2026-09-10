const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN;
const shopifyVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
import { ShopifyCartType, LiveCartResponseType } from "@/types/shopifyTypes";
import { CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, 
  REMOVE_FROM_CART_MUTATION, UPDATE_CART_QUANTITY_MUTATION 
} from "@/graphql/mutations/shopifyCart";
import { GET_CART_QUERY } from "@/graphql/queries/cart";

// Fetch Products and Collections
export async function shopifyFetch<T>({ query, variables }: { query: string, variables?: any }): Promise<{ data: T} | never> {
  
  try {
    const response = await fetch(`https://${domain}/api/${shopifyVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });

    if(!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const result = await response.json();
   
    return result;

  } catch (error) {
    console.error("Shopify Fetch Caught Exception:", error)
    throw error
  }
};


//Fetch Empty Cart
export async function createShopifyCart(variantId: string, quantity = 1): Promise<ShopifyCartType> {
  const response = await shopifyFetch<{ cartCreate: { cart: ShopifyCartType } }>({
    query: CREATE_CART_MUTATION,
    variables: {
      input: {
        lines: [{ merchandiseId: variantId, quantity }]
      },
    },
  });

  return response.data.cartCreate.cart;
}

// Fetch add to cart mutation
export async function addToShopifyCart(cartId:string, variantId: string, quantity = 1) {
  const response = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCartType } }>({
    query: ADD_TO_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  return response.data.cartLinesAdd.cart;
}


// Fetch Live Cart
export async function getLiveCart(cartId: string): Promise<LiveCartResponseType | null> {
  const response = await shopifyFetch<{ cart: LiveCartResponseType }>({
    query: GET_CART_QUERY,
    variables: {cartId}
  });

  return response?.data?.cart || null;
}

// Remove Item from cart
export async function removeFromShopifyCart(cartId: string, lineId: string) {
  const response = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCartType} }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: {
      cartId,
      lineIds: [lineId],
    }
  });
  return response.data.cartLinesRemove.cart;
}

// Update line items quantity in cart
export async function updateCartQuantity(cartId: string, lineId: string, quantity: number): Promise<ShopifyCartType> {
  const response = await shopifyFetch<{ cartLinesUpdate: {cart: ShopifyCartType}}>({
    query: UPDATE_CART_QUANTITY_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }]
    },
  });
  return response.data.cartLinesUpdate.cart;
}