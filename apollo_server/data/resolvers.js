import { AllStrings } from './connectors';

const resolveFunctions = {
  RootQuery: {
    allStrings(){
      return AllStrings.getAll();
    },
    searchStringsByUser(_, {userId}){
      return AllStrings.getStringsByUser(userId);
    },
  },
  RootMutation: {
    addString(_, {string, userId}){
      return AllStrings.addString(string, userId);
    },
  }
 }

export default resolveFunctions;
