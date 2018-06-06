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
 }

export default resolveFunctions;
