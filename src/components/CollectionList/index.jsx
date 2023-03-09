import * as React from 'react';
import searchIcon from '../../assets/icons/icon-search-dark_2023-03-09/icon-search-dark@2x.png';
import './collectionListStyles.css';
import { useNavigate } from 'react-router-dom';


function CollectionList() {
    const navigate = useNavigate();
    // data from back end
    const collectionTypes = ["comapny", "hotel", "location"]
    return (
        <div className="collections">
            <div className="searchbar">
                <h3> COLLECTION TYPES </h3>
                <img src={searchIcon} alt="search icon" />
            </div>
            <div className="list">
                <ul>{
                collectionTypes.map((collectionType) => {
                    return (
                        <li className="collection" onClick={() => navigate('/collections')}>
                            <h3> {collectionType} </h3>
                        </li>
                    )
                })
            }
                </ul>

            </div>
        </div>
    );
}

export default CollectionList;