export const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 20) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`