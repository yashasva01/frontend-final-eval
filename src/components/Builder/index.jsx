import * as React from 'react';
import CreateNewType from '../CreateNewType';
import FieldAdder from '../FieldAdder';

function Builder({collectionTypes, setCollectionTypes}) {
  const [currentType, setCurrentType] = React.useState(collectionTypes[0]);
  React.useEffect(() => {
  }, [collectionTypes]);
  return (
    <div className="content"> 
      <div className="contentHeader"> <h1> Content Types </h1> </div>
      <div className="ContentMaker">  
        <CreateNewType collectionTypes={collectionTypes} setCollectionTypes={setCollectionTypes} 
          currentType={currentType} setCurrentType={setCurrentType}/>
        <FieldAdder currentType={currentType} setCurrentType={setCurrentType}/>
      </div> 
    </div>
  );
}

export default Builder;