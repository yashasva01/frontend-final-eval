import * as React from 'react';
import '../Home/homeStyles.css';
import Header from '../../components/Heading';
import CollectionList from '../../components/CollectionList';
import ContentTypeBuilder from '../../components/ContentTypeBuilder';
import CollectionInstances from '../../components/CollectionInstances';

function Collections() {
  return (
    <div className="home">
      <div className="collectionType"> 
        <Header/>
        <div className="collectionList">
          <CollectionList />
        </div>
        <div className="contentTypeBuilder">
          <ContentTypeBuilder/>
        </div>
      </div>
      <CollectionInstances/>
    </div>
  );
}

export default Collections;