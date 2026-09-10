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
                  price {
                    amount
                    currencyCode
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