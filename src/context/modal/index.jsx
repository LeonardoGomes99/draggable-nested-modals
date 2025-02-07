import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ModalContext = createContext();

export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}


export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const [activeModalIds, setActiveModalIds] = useState([]);
  const [modalCounters, setModalCounters] = useState({}); // Track modal counts for all levels

  // Function to close a modal and all its children
  const closeModal = useCallback((id) => {
    setModals(prevModals => {
      let newModals = prevModals.filter(modal => modal.id !== id);
      // Remove all children of this modal
      newModals = newModals.filter(modal => !modal.id.startsWith(id + '_'));
      return newModals;
    });
    setActiveModalIds(prevIds => prevIds.filter(modalId => modalId !== id && !modalId.startsWith(id + '_')));
    
    setModalCounters(prevCounters => {
      const newCounters = { ...prevCounters };
      delete newCounters[id];
      for (let key in newCounters) {
        if (key.startsWith(id + '_')) {
          delete newCounters[key]; // Remove counters for all child modals
        }
      }
      return newCounters;
    });
    
    console.log('Active Modals:', activeModalIds.filter(modalId => modalId !== id));
  }, [activeModalIds]);

  // Function to open a modal, handle parent-child relationship
  const openModal = useCallback((modalComponent, props = {}, modalId = null, parentModalId = null) => {
    let id;

    if (parentModalId) {
      // Check if parent modal has children, get last number in ID, sum, and add new child
      let parentCounter = modalCounters[parentModalId] || 0;
      parentCounter += 1+ `${generateRandomString(4)}`;

      // Update counter for this parent modal
      setModalCounters(prevCounters => ({
        ...prevCounters,
        [parentModalId]: parentCounter
      }));

      // Generate unique ID for child modal
      id = `${parentModalId}_${parentCounter}`;
      
      // Ensure ID uniqueness if modal with this ID already exists
      while (activeModalIds.includes(id)) {
        parentCounter += 1;
        setModalCounters(prevCounters => ({
          ...prevCounters,
          [parentModalId]: parentCounter
        }));
        id = `${parentModalId}_${parentCounter}`;
      }
    } else {
      id = modalId || uuidv4();
    }

    // Check if a modal with the same ID is already open
    if (activeModalIds.includes(id)) {
      closeModal(id);
    } else {
      const newModal = { id, component: modalComponent, props };
      setModals(prevModals => [...prevModals, newModal]);
      setActiveModalIds(prevIds => [...prevIds, id]);
      console.log('Active Modals:', [...activeModalIds, id]);
    }
  }, [modalCounters, activeModalIds, closeModal]);

  const closeActiveModal = useCallback(() => {
    if (activeModalIds.length > 0) {
      const lastActiveModalId = activeModalIds[activeModalIds.length - 1];
      closeModal(lastActiveModalId);
    }
  }, [activeModalIds, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeActiveModal, activeModalIds }}>
      {children}
      {modals.map((modal) => (
        <ModalWrapper key={modal.id} id={modal.id} component={modal.component} props={modal.props} />
      ))}
    </ModalContext.Provider>
  );
};

const ModalWrapper = ({ id, component: Component, props }) => {
  const { closeModal } = useModal();
  return <Component id={id} onClose={() => closeModal(id)} {...props} />;
};

export const useModal = () => useContext(ModalContext);