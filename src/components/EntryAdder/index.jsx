import * as React from 'react';
import './entryAdderStyles.css';
import editLogo from '../../assets/icons/user-pencil-write-ui-education_2023-03-09/user-pencil-write-ui-education.png';
import deleteLogo from '../../assets/icons/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';

function EntryAdder ({intsance, index, currentCollection, count, setCount, fields, setFields}) {

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
        <img src={deleteLogo} alt="delete"></img>
      </div>
    </div>
  );
}

export default EntryAdder;