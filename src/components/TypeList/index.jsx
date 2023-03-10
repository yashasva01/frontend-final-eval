import * as React from 'react';
import axios from 'axios';

function TypeList ({setCurrentType, id}) {

  const [numInstances, setNumInstances] = React.useState(0);

  function handleTypeClick(item) {
    setCurrentType(item);
  }
  async function getNumberOfInstances(item) {
    const response = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType', {
      'contentType': item,
    } ,{ headers:{
      'x-access-token':localStorage.getItem('token')
    }});
    setNumInstances(response.data.data.length);
  }
  React.useEffect (() => {
    getNumberOfInstances(id);
  },[]);
  return (
    <div className="type" onClick={() => handleTypeClick(id)}>
      <p className="contentTypeName">{id}</p>
      <p className="contentInstancesName"> {numInstances} </p>
    </div>
  );
}

export default TypeList;