import { createContext, useContext, useState } from "react";
import "./Modal.css";

const ModalContext = createContext(null);

export default function Modal({ children }) {
  const [content, setContent] = useState(null);

  const openModal = (content) => setContent(content);
  const closeModal = () => setContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {content && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
