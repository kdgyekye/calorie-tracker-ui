import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation LoginUser($input: LoginInput!) {
        loginUser(input: $input) {
            user {
                _id
                name
                email
                role
                limit
            }
            token
        }
    }
`;
