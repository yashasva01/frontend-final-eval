import * as React from 'react';
import './entryAdderStyles.css';
import editLogo from '../../assets/icons/user-pencil-write-ui-education_2023-03-09/user-pencil-write-ui-education.png';
import deleteLogo from '../../assets/icons/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import axios from 'axios';

function EntryAdder ({intsance, index, currentCollection, id, setInstances}) {
  const [values, setValues] = React.useState([]);
  function updateValues() {
    const someSet = new Set();
    for(const key in intsance.instanceData) {
      someSet.add(intsance.instanceData[key]);
    }
    setValues([...someSet]);
  }
  React.useEffect(() => {
    updateValues();
  }, []);
  async function deleteEntry(id) {
    const response = await axios.post('http://localhost:3003/api/removeContentInstance',{
      'instanceName': id,
    },{
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    });
    const response2 = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType',{
      'contentType': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setInstances(response2.data.data);
  }
  return (
    <div className="singleEntry">
      <p>{index + 1}</p>
      <div className="midDiv"> 
        {
          values.map((value, index) => {
            return (
              <p key={index}> {value} </p>
            );
          })
        }
      </div>
      <div className="lastDiv">
        <img src={editLogo} alt="edit"></img>
        <img src={deleteLogo} alt="delete" onClick={() => deleteEntry(id)}></img>
      </div>
    </div>
  );
}

export default EntryAdder;