import * as React from 'react';
import './homeStyles.css';
import CollectionList from '../../components/CollectionList';

function Home() {
  return (
    <div className="home">
      <div className="collectionType"> 
        <div className="heading"> 
        <h1> CMS+ </h1>
        </div> 
        <div className="collectionList">
          <CollectionList />
        </div>
        <div className="contentTypeBuilder">
          <p> Content type builder</p>
        </div>
      </div>
      <div className="content"> 
        <div className="contentHeader"> <h1> Content Types </h1> </div>
        <div className="ContentMaker">  
          <div className="contentType"> content types </div>
          <div className="contentField"> add fields in content types</div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;