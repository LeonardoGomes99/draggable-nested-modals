import React, { useRef, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import { useModal } from '../../context/modal';

const TAMANHOS_MODAL = {
  "mini": { height: "200px", width: "200px" },
  "pequeno": { height: "300px", width: "300px" },
  "medio": { height: "400px", width: "400px" },
  "grande": { height: "700px", width: "700px" },
  "gigante": { height: "1000px", width: "700px" },
}


export const Modal = ({ id, children, onClose }) => {
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
        onClick={closeActiveModal} // Close the active modal when clicking outside
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            position: 'relative',
            pointerEvents: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        >
          {children}
          <button onClick={onClose}>Close This Modal</button>
        </div>
      </div>
    </Draggable>
  );
};