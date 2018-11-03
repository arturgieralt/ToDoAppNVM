import * as React from 'react';
import  './Modal.css';
interface IModalProps {
    isOpened: boolean;
    children: JSX.Element | JSX.Element [] | string | null;
    onClose: () => void;
    header: string;
}

export function Modal (props: IModalProps) {
    const style: React.CSSProperties = {
        display: props.isOpened ? 'block' : 'none'
    }
    return (
            <div className='modal' style={style}>
                <div className='modal-content'>
                <div className='modal-header'>
                    <span className='close' onClick={props.onClose}>&times;</span>
                    <h2>{props.header}</h2>
                </div>
                <div className='modal-body'>
                    {props.children}
                </div>
                </div>
            </div>     
    );
}