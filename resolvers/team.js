export default {
  Query: {

  },
  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};