// components/Modal.tsx
import React, { ReactNode } from 'react';
import styles from '../app/Modal.module.css'; // You can style your modal using CSS modules

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
