import React from 'react';
import {useQuery,useMutation} from "@apollo/react-hooks"
import {gql} from 'apollo-boost'

// Query Footer Section
const query = gql`
  query {
    allOptionss {
      edges {
        node {
          footer_text
        }
      }
    }
  }
`
const Footer = () => {
  // GraphQl Hooks
    const {data,loading} = useQuery(query)

    if(loading) return null
    console.log(data)
    return ( 
        <div className="footer t-center">{data ?data.allOptionss.edges[0].node.footer_text :""}</div>
    );
}
 
export default Footer;