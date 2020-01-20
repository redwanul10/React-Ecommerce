import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';

import {PrismicLink} from 'apollo-link-prismic'
import {InMemoryCache,gql,IntrospectionFragmentMatcher} from 'apollo-boost'
import ApolloClient from 'apollo-client'
import {ApolloProvider,useQuery} from "@apollo/react-hooks"
import introspectionQueryResultData from './fragment.json';
import resolvers from './ApolloClient/resolvers.js'
import typeDefs from './ApolloClient/typeDefs.js'


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher })
const client = new ApolloClient({
  link:PrismicLink({
    uri:"https://redwan.cdn.prismic.io/graphql"
  }),
  cache,
  typeDefs,
  resolvers
})

// Initial Cache Data
cache.writeData({
  data:{
    cart:[],
    total:0,
    countCartItem:0,
    cartModal:false,
    mobileMenu:false,
    successModal:false,
    __typename:"Query"
  }
})

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
