export default `
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
`;
