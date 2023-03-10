import * as React from 'react';
import './collectionInstances.css';
import ContentLadder from '../ContentLadder';
import axios from 'axios';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const customStyles = {
  content: {
    top: '50%',
    left: '90%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: 400,
    height: '95vh'
  },
};

function CollectionInstances({currentCollection, setCurrentCollection, instances, setInstances} ) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const makeCreaetEntryRequest = async (data) => {
    const response = await axios.post('http://localhost:3003/api/addContentInstance', {
      'instanceName':data.Name,
      'contentType':currentCollection,
      'instanceData':{
        ...data
      }}, {
      headers:{
        'x-access-token':localStorage.getItem('x-access-token')
      }});
    console.log(response.data);
    const response2 = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType',{
      'contentType': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setInstances(response2.data.data);
  };

  const onSubmit = (data) => {
    makeCreaetEntryRequest(data);
  };

  const [variousFields, setVariousFields] = React.useState(['']);
  const [modalOpen, setModalOpen] = React.useState(false);
  async function getInstancesOfCurrentCollection() {
    const response = await axios.post('http://localhost:3003/api/getAllInstancesOfContentType',{
      'contentType': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setInstances(response.data.data);
  }
  async function getAllContentFields() {
    const response = await axios.post('http://localhost:3003/api/getContentField',{
      'name': currentCollection
    }, { headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    }});
    setVariousFields(response.data.data);
  }
  React.useEffect(() => {
    getInstancesOfCurrentCollection();
    getAllContentFields();
  }, [currentCollection]);

  return (
    <div className='content'> 
      <div className='contentHeader'> <h1>  {currentCollection} </h1> </div>
      <div className='contentBuilderBody'> 
        <div className='contentDetails'>
          {(instances === undefined) ? <h3 className='instanceCount'> Select a Collection </h3> :  <h3 className='instanceCount'> {instances.length} Entries found </h3>}
          <p id='addEntry'onClick={setModalOpen}> Add a new entry</p>
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            style={customStyles}
          >
            <div className='newEntryModal'>
              <h2> Add a new entry </h2>
              <form className='inputForEntries'onSubmit={handleSubmit(onSubmit)}>
                {
                  (variousFields!== undefined)? 
                    variousFields.map(  (field, index) => {
                      return (
                        <div key={index}>
                          <p>{field}</p>
                          <input type='text' name={field} placeholder={field} {...register(field)}/>
                        </div>
                      );
                    }) :
                    <div>
                      <p> No fields found </p>
                    </div>
                }
                <div className='formControl'>
                  <button className='cancelButton' onClick={() => setModalOpen(false)}> Cancel </button>
                  <button type='submit' className='addButton'> Add </button>
                </div>
              </form>
              
            </div>
          </Modal>
        </div>
        <ContentLadder instances={instances} setInstances={setInstances} currentCollection={currentCollection} /> 
      </div>
    </div>
  );
}


export default CollectionInstances;