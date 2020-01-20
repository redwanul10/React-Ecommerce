import React from 'react';
import Loading from './Loading.js'
import {gql} from 'apollo-boost'
import {useQuery,useMutation} from "@apollo/react-hooks"

// Query Content
const query = gql`
    query MyQuery {
        allAbouts {
        edges {
            node {
            description
            page_title
            photo
            header_image
            }
        }
        }
    }
  
`

const About = (props) => {
    // Graphql Hooks
    const {data,loading,error} = useQuery(query)
    // Loading
    if(loading) return <Loading/>
    
    const about = data.allAbouts.edges[0].node;
    const background={background:`  background: url(${about.header_image.url}) center center /cover;`}
    return ( 
        <div className="about">
            {/* Top Content */}
            <h2 style={background}className="pageHeader l-text2 t-center">About</h2>
            <div className="ourStory bgwhite p-t-66 p-b-38">
                <div className="container">
                    <div className="row">
                        {/* Photo */}
                        <div className="col-md-4">
                            <img src={about.photo.url} alt=""/>
                        </div>
                        {/* Content */}
                        <div className="col-md-7">
                            <h3 class="m-text26 p-t-15 p-b-16">{about.page_title[0].text}</h3>
                            <p className="p-b-28">{about.description[0].text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default About;