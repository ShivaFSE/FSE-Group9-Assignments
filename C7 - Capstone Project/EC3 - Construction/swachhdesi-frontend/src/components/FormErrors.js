import React from 'react';

const getDisplayFieldName = (fieldName) => {
  let displayFieldName;
  if (fieldName === "userType") {
    displayFieldName = "User type"
  }
  else {
    displayFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
  return displayFieldName
}

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0) {
        return (
          <p key={i}>{getDisplayFieldName(fieldName)} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>