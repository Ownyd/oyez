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
    if(document.getElementById("listWrapper") === null)
    {
      //var nameValue = document.getElementById("userIdForm").value;
      var newDiv = document.createElement("div");
      newDiv.id = "listWrapper";
      var currentDiv = document.getElementById("listContainer"); 
      currentDiv.insertBefore(newDiv, currentDiv.nextSibling);
      client.query({
        query: gql`{ allStrings { string } }`
      }).then(
        result => 
        result.data.allStrings.forEach(element => {
          var newDiv = document.createElement("div");
          newDiv.innerHTML = element.string;
          var currentDiv = document.getElementById("listWrapper"); 
          currentDiv.insertBefore(newDiv, currentDiv.nextSibling);         
        })
      );
    }
  }
  render() {
    return (
       <ApolloProvider client={client}><div>
          <form>
          <input id="userIdForm" type="text" placeholder="Votre numéro d'identifiant"></input>
          </form>
          <button onClick={this.showList.bind(this)}></button>
          <div id="listContainer"></div>
       </div></ApolloProvider>
    );
  }
}

client.query({
  query: gql`
    {
      allStrings {
        string
      }
    }
  `
})
.then(result => console.log(result.data.allStrings[0].string));




export default App;