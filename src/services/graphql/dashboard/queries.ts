import {gql} from "@apollo/client"

export const GET_ENTRIES_WEEK = gql`
    query Query {
    sumLastWeekEntries
    }
` 

export const GET_ENTRIES_TWO_WEEKS = gql`
    query Query {
        sumLastTwoWeeksEntries
    }
`