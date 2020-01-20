import React from 'react';
import {gql} from 'apollo-boost'
import {useQuery,useMutation} from "@apollo/react-hooks"
import Loading from './Loading'

// Query Page Content
const query = gql`
  query {
    allOrders(where: {pagetype: "canceled"}) {
        edges {
          node {
            page_title
            image
          }
        }
      }
  }
`

const Cancel = () => {
  // Graphql Hooks
    const {data,loading} = useQuery(query)
  // Loaidng
    if(loading) return <Loading/>
    return ( 
        <div className="success">
            <h1>{data.allOrders.edges[0].node.page_title[0].text}</h1>
            <img src={data.allOrders.edges[0].node.image.url} alt=""/>
        </div>
     );
}
 
export default Cancel;