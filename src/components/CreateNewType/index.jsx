import * as React from 'react';
import './createNewTypeStyles.css';
import searchIcon from '../../assets/icons/icon-search-dark_2023-03-09/icon-search-dark.png';
import Modal from 'react-modal';
import axios from 'axios';
import TypeList from '../TypeList';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: 400,
    borderRadius: '10px',
  }
};

function CreateNewType({collectionTypes, setCollectionTypes, currentType, setCurrentType}) {

  const [modalOpen, setModalOpen] = React.useState(false);
  const [newType, setNewType] = React.useState('');



  React.useEffect(() => {
  }, [collectionTypes]);
  async function addContentType() {
    await axios.post('http://localhost:3003/api/contentType', {
      name: newType
    } , {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }});
    setCollectionTypes([...collectionTypes, newType]);
  }
  function changeHandler(event) {
    setNewType(event.target.value);
  }

  function handleTypeClick(item) {
    setCurrentType(item);
  }
  return (
    <div className="contentType"> 
      <div className="searchType">
        <p>{`${collectionTypes.length} Types`}</p>
        <img src={searchIcon} alt = "searchIcon" />
      </div>
      <div className="addNewType" onClick={setModalOpen}>
        <p> + NEW TYPE </p>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}>
        <div className="modalDivWhole">
          <div className="modalDiv"> <h3> Create a new content type </h3></div>
          <div className="inputContainer">
            <p> Name of content type </p>
            <input type="text" className="contentTypeInput" onChange={changeHandler}/>
          </div>
          <div className="buttonContainer">
            <button className="cancelButton" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="createButton" onClick={function(event){addContentType(); setModalOpen(false);}}>Create</button>
          </div>                    
        </div>
      </Modal>
      {
        collectionTypes.map((item, index) => {
          return (
            <TypeList setCurrentType={setCurrentType} id={item} key={index}/>
          );
        })
      }

    </div>
  );
}

export default CreateNewType;
