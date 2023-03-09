import * as React from 'react';
import './fieldAdderStyles.css';
import editLogo from '../../assets/icons/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
import deleteLogo from '../../assets/icons/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import axios from 'axios';
import Modal from "react-modal";

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: 400,
      borderRadius: "10px",
    }
  };


function FieldAdder({currentType, setCurrentType}) {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [newField, setNewField] = React.useState('');
    const [fieldData, setFieldData] = React.useState([]);

    function changeHandler(event) {
        setNewField(event.target.value);
    }
    
    async function addContentField() {
        await axios.post('http://localhost:3003/api/contentField', {
            "name":currentType,
            "field":newField
        }, { headers:{
            'x-access-token':localStorage.getItem('x-access-token')
        }});
        setFieldData([...fieldData, newField]);
    }
    async function deleteContentField(item){
        await axios.post('http://localhost:3003/api/removeContentField', {
            "name": currentType,
            "field": item
        }, { headers:{
            'x-access-token':localStorage.getItem('x-access-token')
        }});
        setFieldData(fieldData.filter((field) => field !== item));
    } 
    async function getAllFields() {
        const response = await axios.post('http://localhost:3003/api/getContentField', {
            "name": currentType
        } , { headers:{
            'x-access-token':localStorage.getItem('x-access-token')
        }});
        setFieldData(response.data.data);
    }

    React.useEffect(() => {
        getAllFields();
    }, [currentType]);

    return (
        <div className="contentField"> 
            <div className="contentField__header">
                <h2 className="contentField__title"> {currentType} </h2>
                <img src={editLogo} alt="edit logo"/>
            </div>
            <p> Count Of Instances </p>
            <div className="fieldAdder">
                <div className="addNewField" onClick={setModalOpen}>
                    <p> Add Another Field </p>
                </div>
                <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}>
                    <div className="modalDivWhole">
                        <div className="modalDiv"> <h3> Add a new filed </h3></div>
                        <div className="inputContainer">
                            <p> Name of content field </p>
                            <input type="text" className="contentTypeInput" onChange={changeHandler} />
                        </div>
                        <div className="buttonContainer">
                            <button className="cancelButton" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="createButton" onClick={function(event){ addContentField() ;setModalOpen(false)}}>Create</button>
                        </div>                    
                    </div>
            </Modal>
                {
                    fieldData.map((item, index) => {
                        return (
                            <div className="field" key={index}>
                                <div className="typeTag">
                                    AB
                                </div>
                                <p>{item}</p>
                                <p> TEXT </p>
                                <div className="buttonCluster"> 
                                    <img src={editLogo} alt="edit"/>
                                    <img src={deleteLogo} alt="delete" className="removeIcon" onClick={() => deleteContentField(item)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FieldAdder;
