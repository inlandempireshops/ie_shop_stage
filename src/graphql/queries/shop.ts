export const GET_SHOP_COLLECTION = `
  query getCollection($handle: String!) {

    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: 40) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 40) {
              edges {
                node {
                  id
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  sellingPlanAllocations(first: 1) {
                    nodes {
                      sellingPlan {
                        id
                      }
                    }
                  }
                }
              }
            }
            seo {
              title
              description
            }
          }
        }
      }

    }
  }
`