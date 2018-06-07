import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";


const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});


class App extends Component {

  showList()
  {
    function addString(userId, string)
    {

      client.mutate({
        variables: { userId: userId, string: string },
        mutation: gql`mutation addStringMutation($userId: Int!, $string : String!)
        {
          addString(userId: $userId, string: $string)
        }
        `,        
      })
    }
  
    if(document.getElementById("listWrapper") !== null)
    {
    var element = document.getElementById("listWrapper");
    element.parentNode.removeChild(element);
    }

    var newDiv = document.createElement("div");
    newDiv.id = "listWrapper";
    var currentDiv = document.getElementById("listContainer"); 
    currentDiv.insertBefore(newDiv, currentDiv.nextSibling);



    var userId = document.getElementById("userIdForm").value;
    const query = gql`query searchStringsByUserQuery($userId:Int!)
    {
      searchStringsByUser(userId: $userId) {
        _id
        string
      }
    }`;

    client.query({ query, variables: {userId: userId}}).then(result => 
{
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.id ="inputId";
      var currentDiv = document.getElementById("listWrapper"); 
      currentDiv.insertBefore(newInput, currentDiv.nextSibling);

     newInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13)
          addString(userId, newInput.value);
      });

      result.data.searchStringsByUser.forEach(element => {
      var newDiv = document.createElement("div");
      newDiv.innerHTML = element.string;
      newDiv.id = element._id;
      var currentDiv = document.getElementById("listWrapper");
      currentDiv.insertBefore(newDiv, currentDiv.nextSibling);         
        })
});
  }

  render() {
    return (
       <ApolloProvider client={client}><div>
          <input id="userIdForm" type="text" placeholder="Votre numéro d'identifiant"></input>
          <button onClick={this.showList.bind(this)}></button>
          <div id="listContainer"></div>
       </div></ApolloProvider>
    );
  }
}


export default App;