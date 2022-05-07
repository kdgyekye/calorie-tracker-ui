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

export const GET_LAST_WEEK_AVERAGE_ENTRIES = gql`
    query AverageLastWeekEntries {
  averageLastWeekEntries {
    _id
    total
    avg
    user {
      name
      email
      role
      _id
    }
  }
}
`