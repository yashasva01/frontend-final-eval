import * as React from 'react';
import '../Home/homeStyles.css';
import Header from '../../components/Heading';
import CollectionList from '../../components/CollectionList';
import ContentTypeBuilder from '../../components/ContentTypeBuilder';
import CollectionInstances from '../../components/CollectionInstances';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Collections({collectionTypes, setCollectionTypes}) {
  const navigate = useNavigate();
  const [currentCollection, setCurrentCollection] = React.useState(collectionTypes[0]);
  const [instances, setInstances] = React.useState([]);

  function refreshCollectionList() {
    axios.get('http://localhost:3003/api/getAllContentType', { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }})
      .then((response) => {
        setCollectionTypes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getInstancesOfCurrentCollection() {
    const response = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType',{
      'contentType': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setInstances(response.data.data);
  }


  React.useEffect(() => {
    refreshCollectionList();
    getInstancesOfCurrentCollection();
  }
  , []); 
  return (
    <div className="home">
      <div className="collectionType"> 
        <Header/>
        <div className="collectionList" onClick={() => navigate('/collections')}>
          <CollectionList collectionTypes={collectionTypes} setCollectionTypes={setCollectionTypes} 
            currentCollection={currentCollection} setCurrentCollection={setCurrentCollection}/>
        </div>
        <div className="contentTypeBuilder">
          <ContentTypeBuilder/>
        </div>
      </div>
      <CollectionInstances currentCollection={currentCollection} setCurrentCollection={setCurrentCollection}
        instances={instances} setInstances={setInstances}/>
    </div>
  );
}

export default Collections;