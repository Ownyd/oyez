const typeDefinitions = `

# the schema allows the following two queries:

type ObjString {
  _id: String
  userId: Int
  string : String
}

type RootQuery {
  allStrings: [ObjString]
  searchStringsByUser (userId : Int!) : [ObjString]
}

type RootMutation {
  addString(string: String!, userId : Int!) : String
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default [typeDefinitions];
