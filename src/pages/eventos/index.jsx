import { Fragment } from 'react';
import { openNestedModal, openSimpleModal } from '../../component/modal';
import { useModal } from '../../context/modal';
import './index.css';


export const PaginaTeste = ({ increaseNumber, onClose }) => {

    const { openModal, closeModal, activeModalIds } = useModal();

    return (
        <Fragment>

            <input onChange={e => increaseNumber(e)} />

            <div className="content">
                <h1>Content</h1>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
                <p>Some content blablabla, some content blablabla.</p>
            </div>
        </Fragment>
    )
}