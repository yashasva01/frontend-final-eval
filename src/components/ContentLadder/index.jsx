import * as React from 'react';
import './contentLadderStyles.css';
import EntryAdder from '../EntryAdder';
import axios from 'axios';

function ContentLadder({instances, setInstances, currentCollection}) {
  const [count, setCount] = React.useState(0);
  const [fields, setFields] = React.useState([]);
  async function getFieldForCurrentCollection() {
    const response = await axios.post('http://localhost:3003/api/getContentField', {
      'name': currentCollection
    } ,{
      headers: {   
        'x-access-token': localStorage.getItem('x-access-token')
      }});
    setFields(response.data.data);
  }
  React.useEffect(() => {
    getFieldForCurrentCollection();
  }, [currentCollection]);
  return (
    <div className="contentLadder">
      {
        (instances === undefined) ? <p> Loading ... Choose a Collection </p> :
          <div className="Entries">
            <div className="entryHeader">
              <p>ID</p>
              {
                (fields !== undefined)? 
                  (fields.map((field, index) => {
                    return (
                      (count< 4)? <p key={index}> {field} </p> : null
                    );
                  })): <p> Loading ... </p>
              }
              <p> Actions </p>
            </div>
            {
              instances.map((instance, index) => {
                return (
                  <EntryAdder intsance={instance} key={index} index={index} currentCollection={currentCollection} 
                    count={count} setCount={setCount} fields={fields} setFields={setFields}/>
                );
              })
            }
          </div>
      }
    </div>

  );
}

export default ContentLadder;