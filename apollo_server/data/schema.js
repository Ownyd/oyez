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

schema {
  query: RootQuery
}
`;

export default [typeDefinitions];
