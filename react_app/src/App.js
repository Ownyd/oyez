import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";


const client = new ApolloClient({
	uri: "http://localhost:8080/graphql"
});

function addString(userId, string)
{
  var stringInput = document.getElementById("stringInput");
  var currentDiv = document.getElementById("listWrapper");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = stringInput.value;
  currentDiv.insertBefore(newDiv, currentDiv.nextSibling);         

  client.mutate({
    variables: { userId: userId, string: string },
    mutation: gql`mutation addStringMutation($userId: Int!, $string : String!)
    {
      addString(userId: $userId, string: $string)
      {
        _id
          userId
          string
      }
    }
    `,        
  }).then(result => {
    newDiv.id = result.data.addString[0]._id;
    newDiv.addEventListener('click', (event) => {
      delString(newDiv.id);
    });
  });    
}

function delString(stringId)
{
  if(document.getElementById(stringId) !== null)
  {
    var element = document.getElementById(stringId);
    element.parentNode.removeChild(element);
  }
  client.mutate({
    variables: { _id: stringId },
    mutation:  gql`mutation delStringMutation($_id : String!)
    {
      delString(_id: $_id)
    }`,
  })
}

class App extends Component {
	showList()
	{
		/* Clean Wrapper to avoid duplicate list */

		if(document.getElementById("listWrapper") !== null)
		{
			var element = document.getElementById("listWrapper");
			element.parentNode.removeChild(element);
		}

		var newDiv = document.createElement("div");
		newDiv.id = "listWrapper";
		var currentDiv = document.getElementById("listContainer"); 
		currentDiv.insertBefore(newDiv, currentDiv.nextSibling);

		/* Read query to fill list */

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
					newInput.id ="stringInput";
					newInput.placeholder="Ajoutez des Strings";
					var currentDiv = document.getElementById("listWrapper"); 
					currentDiv.insertBefore(newInput, currentDiv.nextSibling);

					newInput.addEventListener('keydown', (event) => {
						if (event.keyCode === 13)
							addString(userId, newInput.value);
					});
					/* List filling */
					result.data.searchStringsByUser.forEach(element => {
						var newDiv = document.createElement("div");
						newDiv.innerHTML = element.string;
						newDiv.id = element._id;
						newDiv.addEventListener('click', (event) => {
							delString(newDiv.id);
						});
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
