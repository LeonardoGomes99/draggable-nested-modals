import React, { useState } from 'react';
import { Modal } from './component/modal';
import { useModal } from './context/modal';
import './App.css';

const App = () => {
  const { openModal, closeModal, activeModalIds } = useModal();
  
  const openNestedModal = (parentModalId, hasChildren = true) => {
    const modalId = null;
    openModal(
      ({ id, onClose }) => (
        <Modal id={id} onClose={onClose} hasChildren={hasChildren}>
          <h2>{hasChildren ? 'Nested Modal' : 'Simple Modal'}</h2>
          {hasChildren && (
            <button onClick={() => openNestedModal(id)}>Open Another Nested Modal</button>
          )}
        </Modal>
      ),
      {}, // Additional props (if any)
      modalId, // Pass the custom modal ID
      parentModalId // Pass the parent modal ID for nested modals
    );
  };

  const handleCloseModalById = () => {
    if (modalIdToClose) {
      closeModal(modalIdToClose); // Close the modal with the specified ID
      setModalIdToClose(''); // Clear the input field
    }
  };

  return (
    <div>
      <h1>Recursive Modals with UUID</h1>
      <button onClick={() => openNestedModal("n", true, )}>Open Nested Modal</button>
      <button onClick={() => openNestedModal(null, false)}>Open Simple Modal</button>
    </div>
  );
};

export default App;