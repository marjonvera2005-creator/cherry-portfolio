'use client';

import Icon from './Icons';

export default function Modal({ dialogRef, className, labelledBy, children }) {
  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onClick={e => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <button className="modal-close" type="button" aria-label="Close" onClick={() => dialogRef.current.close()}>
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}
