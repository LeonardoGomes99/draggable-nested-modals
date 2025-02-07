import { Fragment } from 'react';
import { openNestedModal, openSimpleModal, closeThisModal } from '../../component/modal';
import { useModal } from '../../context/modal';
import './index.css';


export const PaginaTeste = ({ increaseNumber }) => {

    const { openModal, closeModal, activeModalIds } = useModal();
    
    const closeThisModalButton = (e) => {
        closeThisModal(e);
    }

    return (
        <Fragment>
            <div className="header">
                <h1>Header</h1>
                <p>My supercool header</p>
            </div>

            <button onClick={closeThisModalButton}>Fechar</button>

            <input onChange={e=>increaseNumber(e)} />            

            <button onClick={() => openNestedModal("modal_id-tabelas", openModal, closeModal, 'xxl', <PaginaTeste increaseNumber={increaseNumber} />)}>Open Nested Modal</button>      

            <div className="content">
                <h1>Content</h1>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
            </div>
        </Fragment>
    )
}