import * as React from 'react';
import './typeBuilderStyles.css';
import { useNavigate } from 'react-router-dom';

function ContentTypeBuilder() {
  const navigate = useNavigate();

  return (
    <div className="contentTypeBuilder">
      <p onClick={function(event){navigate('/home'); } }> CONTENT TYPE BUILDER </p>
    </div>
  );
}

export default ContentTypeBuilder;