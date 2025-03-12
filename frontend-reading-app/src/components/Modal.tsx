import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
  }

  
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Modal</h3>
              <button onClick={onClose} className="text-red-500">
                X
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      );
    };
    
    export default Modal;