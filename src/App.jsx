import React, { useState } from 'react';
import { openModalWindow } from './component/modal';
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
        openModalWindow("modal_id-tabelas", openModal, 'sm', (onClose) => <PaginaTeste increaseNumber={increaseNumber} onClose={onClose} />)}>
        Open Nested Modal
      </button>
    </div>
  );
};

export default App;