import rp from 'request-promise';
import _ from 'lodash';


const AllStrings = {
  getAll(){
    return rp('http://localhost:8090/api/list')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return (res);
      });
  },
  getStringsByUser(userId){
    return rp('http://localhost:8090/api/list')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return (res.filter(str => str.userId == userId));
      });
  },
  addString(string, userId){
    return rp('http://localhost:8090/api/create?userID='+userId+'&string='+string)
      .then((res) => JSON.parse(res))
      .then((res) => {
        return (res.state);
      });
  },
};

export { AllStrings };
