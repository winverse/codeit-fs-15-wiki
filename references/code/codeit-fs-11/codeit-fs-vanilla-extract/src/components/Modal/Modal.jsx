import { Button } from '../Button';
import {
  modal,
  modalActions,
  modalBody,
  modalTitle,
  overlay,
} from './Modal.css.js';

export default function Modal({ title, children, onClose }) {
  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  return (
    <div className={overlay} onClick={handleClose}>
      <section
        className={modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={handleClick}
      >
        <h2 className={modalTitle} id="modal-title">
          {title}
        </h2>
        <div className={modalBody}>{children}</div>
        <div className={modalActions}>
          <Button variant="ghost" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </section>
    </div>
  );
}
