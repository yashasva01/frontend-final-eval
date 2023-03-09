import * as React from 'react';
import './collectionInstances.css'
import ContentLadder from '../ContentLadder';

function CollectionInstances() {
    return (
        <div className="content"> 
            <div className="contentHeader"> <h1> Selected Content type </h1> </div>
            <div className="contentBuilderBody"> 
                <div className="contentDetails">
                    <p> X Entries found </p>
                    <p id="addEntry"> Add a new entry</p>
                </div>
                <ContentLadder /> 
            </div>
        </div>
    )
}


export default CollectionInstances;