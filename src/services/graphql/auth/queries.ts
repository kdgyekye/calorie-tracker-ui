import {gql} from "@apollo/client"

export const CURRENT_USER = gql`
    query CurrentUser {
      currentUser {
        _id
        name
        email
        role
        limit
        limitReached {
          calories
          reachedAt
        }
        createdAt
        updatedAt
      }
  }
`