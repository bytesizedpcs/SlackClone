export default `
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createTeam(name: String!): Boolean!
    createChannel(teamId: Int!, name: String!, public: Boolean=false): Boolean!
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
