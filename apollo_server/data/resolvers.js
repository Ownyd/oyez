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
    delString(_, {_id}){
      return AllStrings.delString(_id);
    },
  }
 }

export default resolveFunctions;
