'use client'
import React, { useState } from 'react';

const FirstSubsection = () => {
  const [formState, setFormState] = useState({
    selectedRadio: 'option1',
    inputValue: '',
    isChecked: false,
    selectedOption: '',
  });
console.log(formState);
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  return (
    <div className='mx-10 flex transform flex-col justify-center lg:min-h-[82vh]'>
      <div className="mb-4">
        <label className="block">
          <input type="radio" name="selectedRadio" value="option1"
                 checked={formState.selectedRadio === 'option1'}
                 onChange={handleInputChange} className="mr-2" />
          Option 1
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <input type="radio" name="selectedRadio" value="option2"
                 checked={formState.selectedRadio === 'option2'}
                 onChange={handleInputChange} className="mr-2" />
          Option 2
        </label>
      </div>
      <input type="text" name="inputValue" value={formState.inputValue} onChange={handleInputChange} className="mb-4 p-2 border rounded" />
      <div className="mb-4">
        <label className="block">
          <input type="checkbox" name="isChecked" checked={formState.isChecked} onChange={handleInputChange} className="mr-2" />
          Check me
        </label>
      </div>
      <select name="selectedOption" value={formState.selectedOption} onChange={handleInputChange} className="mb-4 p-2 border rounded">
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>
  );
}

export default FirstSubsection;