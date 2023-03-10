import * as React from 'react';
import './homeStyles.css';
import CollectionList from '../../components/CollectionList';
import ContentTypeBuilder from '../../components/ContentTypeBuilder';
import Builder from '../../components/Builder';
import Header from '../../components/Heading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [collectionTypes, setCollectionTypes] = React.useState([]);

  async function getDataAndSet() {
    const response = await axios.get('http://localhost:3003/api/getAllContentType', { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setCollectionTypes(response.data.data);
  }
  React.useEffect(() => {
    getDataAndSet();
  }, []);


  return (
    <div className="home">
      <div className="collectionType"> 
        <Header/>
        <div className="collectionList" onClick={() => navigate('/collections')} >
          <CollectionList collectionTypes={collectionTypes} setCollectionTypes={collectionTypes}/>
        </div>
        <div className="contentTypeBuilder">
          <ContentTypeBuilder />
        </div>
      </div>
      {
        (collectionTypes.length === 0) ?  <div className="blank"> </div> : <Builder collectionTypes={collectionTypes} setCollectionTypes={setCollectionTypes} /> 
      }     
    </div>
  );
}

export default Home;