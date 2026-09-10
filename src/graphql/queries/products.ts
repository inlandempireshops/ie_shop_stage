export const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      options {
        name
        values
      }
      images(first: 5) {
        edges {
          node { 
            url 
            altText 
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      seo {
        title
        description
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            }
        }
      }
    }
  }
`;