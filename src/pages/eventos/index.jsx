import { Fragment } from 'react';
import { openModalWindow } from '../../component/modal';
import { useModal } from '../../context/modal';
import './index.css';


export const PaginaTeste = ({ increaseNumber, onClose }) => {

    const { openModal, closeModal, activeModalIds } = useModal();

    return (
        <Fragment>

            <input onChange={e => increaseNumber(e)} />

            <button onClick={onClose}>Hello World</button>

            <button onClick={() =>
                openModalWindow("modal_id-tabelas", openModal, 'sm', (onClose) => <PaginaTeste increaseNumber={increaseNumber} onClose={onClose} />)}>
                Open Nested Modal
            </button>

            <div className="content">
                <h1>Content</h1>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
            </div>
        </Fragment>
    )
}