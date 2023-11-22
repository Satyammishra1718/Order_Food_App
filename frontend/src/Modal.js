import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalContent = modalRef.current;

    if (modalContent.scrollHeight > modalContent.clientHeight) {
      modalContent.style.overflowY = 'auto';
    } else {
      modalContent.style.overflowY = 'hidden';
    }
  }, [children]);

  return createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          backgroundColor: 'rgb(34,34,34)',
          transform: 'translate(-50%,-50%)',
          zIndex: 1000,
          height: '90%',
          width: '90%',
        }}
      >
        <button
          className='btn bg-danger fs-4 cancelButton'
          style={{ marginLeft: '95%', marginTop: '10px' }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-roott')
  );
}
