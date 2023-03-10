import * as React from 'react';
import searchIcon from '../../assets/icons/icon-search-dark_2023-03-09/icon-search-dark@2x.png';
import './collectionListStyles.css';


function CollectionList({collectionTypes, setCollectionTypes, currentCollection, setCurrentCollection }) {
  // data from back end
  // console.log(collectionList);
    
  // const collectionList = ["comapny", "hotel", "location"]
  function onItemClick(item) {
    setCurrentCollection(item);
  }
  return (
    <div className="collections">
      <div className="searchbar">
        <h3> COLLECTION TYPES </h3>
        <img src={searchIcon} alt="search icon" />
      </div>
      <div className="list">
        <ul>{
          collectionTypes?.map((collectionType,index) => {
            return (
              <li className="collection" key={index} onClick={ () => onItemClick(collectionType)}>
                <h3> {collectionType} </h3>
              </li>
            );
          })
        }
        </ul>

      </div>
    </div>
  );
}

export default CollectionList;