import React, { useRef, useEffect, useContext, Fragment } from 'react';
import Draggable from 'react-draggable';
import { useModal } from '../../context/modal';

export const openNestedModal = (parentModalId, openModal, closeModal, size = 'md', component = <Fragment />) => {
  const modalId = null;
  openModal(
    ({ id, onClose }) => (
      <Modal id={id} onClose={onClose} size={size}>
        <div className='thisClose' onClick={e => closeModal(id)}>
          {component}
        </div>
      </Modal>
    ),
    {}, // Additional props (if any)
    modalId, // Pass the custom modal ID
    parentModalId // Pass the parent modal ID for nested modals
  );
};

export const openSimpleModal = (parentModalId, openModal, closeModal, size = 'md', component = <Fragment />) => {
  const modalId = null;
  openModal(
    ({ id, onClose }) => (
      <Modal id={id} onClose={onClose} size={size}>
        <div className='thisClose' onClick={e => closeModal(id)}>
          {component ? component : <h1>Hello World</h1>}
        </div>
      </Modal>
    ),
    {}, // Additional props (if any)
    modalId, // Pass the custom modal ID
    parentModalId // Pass the parent modal ID for nested modals
  );
};

export const closeThisModal = (e) => {
  const modal = e.target.closest(".thisClose");
  debugger
  if (modal && e.currentTarget !== modal) {
    modal.dispatchEvent(new Event("customClick", { bubbles: true }));
  }
}

/// CORE MODAL
export const Modal = ({ id, children, onClose, size }) => {
  const nodeRef = useRef(null);
  const { closeActiveModal } = useModal(); // Use the closeActiveModal function

  // Function to calculate the bounds for dragging
  const getBounds = () => {
    return {
      bottom: window.innerHeight - 100,
      top: -window.innerHeight + 100,
      left: -window.innerWidth + 100,
      right: window.innerWidth - 100,
    };
  };

  const TAMANHOS_MODAL = {
    "xs": { height: "200px", width: "300px" },
    "sm": { height: "300px", width: "400px" },
    "md": { height: "400px", width: "600px" },
    "xl": { height: "500px", width: "900px" },
    "xxl": { height: "600px", width: "1180px" },
  }

  // Ensure the modal is centered when it first appears
  useEffect(() => {
    if (nodeRef.current) {
      const modal = nodeRef.current;
      const { width, height } = modal.getBoundingClientRect();
      modal.style.top = `calc(50% - ${height / 2}px)`;
      modal.style.left = `calc(50% - ${width / 2}px)`;
    }
  }, []);

  return (
    <Draggable nodeRef={nodeRef} bounds={getBounds()}>
      <div
        ref={nodeRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
        onClick={closeActiveModal}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            position: 'relative',
            pointerEvents: 'auto',
            height: TAMANHOS_MODAL[size].height,
            width: TAMANHOS_MODAL[size].width,
            maxWidth: '100vw',
            maxHeight: '100vh',
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button onClick={onClose}>Close This Modal</button>
        </div>
      </div>
    </Draggable>
  );
};