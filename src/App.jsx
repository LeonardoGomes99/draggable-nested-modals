import React, { useState } from 'react';
import { openNestedModal, openSimpleModal } from './component/modal';
import { useModal } from './context/modal';
import { PaginaTeste } from './pages/eventos';
import './App.css';

const App = () => {
  const { openModal, closeModal, activeModalIds } = useModal();

  const [num, setNum] = useState("");

  const increaseNumber = (e) => {
    setNum(e.target.value);
  }

  return (
    <div>
      <h1>Recursive Modals with UUID</h1>
      {num}
      <br />
      <button onClick={() =>
        openNestedModal("modal_id-tabelas", openModal, 'xxl', (onClose) => <PaginaTeste increaseNumber={increaseNumber} onClose={onClose} />)}>
        Open Nested Modal
      </button>
    </div>
  );
};

export default App;