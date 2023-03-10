import * as React from 'react';
import './collectionInstances.css';
import ContentLadder from '../ContentLadder';
import axios from 'axios';

function CollectionInstances({currentCollection, setCurrentCollection, instances, setInstances} ) {

  async function getInstancesOfCurrentCollection() {
    const response = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType',{
      'contentType': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setInstances(response.data.data);
  }

  React.useEffect(() => {
    getInstancesOfCurrentCollection();
  }, [currentCollection]);

  return (
    <div className="content"> 
      <div className="contentHeader"> <h1>  {currentCollection} </h1> </div>
      <div className="contentBuilderBody"> 
        <div className="contentDetails">
          {(instances === undefined) ? <h3 className="instanceCount"> Select a Collection </h3> :  <h3 className="instanceCount"> {instances.length} Entries found </h3>}
          <p id="addEntry"> Add a new entry</p>
        </div>
        <ContentLadder instances={instances} setInstances={setInstances} currentCollection={currentCollection} /> 
      </div>
    </div>
  );
}


export default CollectionInstances;