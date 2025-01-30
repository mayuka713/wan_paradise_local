import React, { createContext, useContext, useState, ReactNode } from "react";

// モーダルの状態を管理する型
interface ModalContextType {
  isModalOpen: boolean;
  openModal: (storeName: string) => void;
  closeModal: () => void
  storeName: string;
}

// Context を作成
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider コンポーネント
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeName, setStoreName] = useState("");

  const openModal = (name: string) => {
    setStoreName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStoreName("");
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, storeName }}>
      {children}
    </ModalContext.Provider>
  );
};

// Context を利用するためのカスタムフック
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
