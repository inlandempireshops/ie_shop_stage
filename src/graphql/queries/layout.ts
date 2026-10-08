export const GET_LAYOUT_QUERY = `
  query getLayoutData {
    shop {
      name
      primaryDomain {
        url
      }
      termsOfService {
        id
        title
        body
        url
      }
      privacyPolicy {
        id
        title
        body
        url
      }
      refundPolicy {
        id
        title
        body
        url
      }
      shippingPolicy {
        id
        title
        body
        url
      }
    }
  }
`