import { createContext, useContext, useState } from "react";
import Modal from "./Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [context, setContext] = useState(null);

    const openModal = (context) => setContext(context);
    const closeModal = () => setContext(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            <Modal open={context !== null}>
                {context}
            </Modal>
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}