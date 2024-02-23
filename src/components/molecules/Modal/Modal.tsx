import FloatingButton from "@/components/atoms/Button/FloatingButton";
import React, { ReactNode, useState } from "react";

interface ModalProps {
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div className="container">
      <FloatingButton
        onClick={() => setIsShowPopup(true)}
        position="bottom-left"
      >
        +
      </FloatingButton>

      {isShowPopup && (
        <>
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-sm w-9/12  p-5 rounded-lg ${
              isShowPopup ? "block" : "hidden"
            }`}
            onClick={() => setIsShowPopup(false)}
          >
            <div
              className="popup-content relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsShowPopup(false)}
                className="absolute top-3 right-3 bg-gray-200 h-8 w-8 rounded-full text-black hover:bg-gray-300"
              >
                &times;
              </button>
              <div className="mt-4">{children}</div>
            </div>
          </div>

          <div
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={() => setIsShowPopup(false)}
          />
        </>
      )}
    </div>
  );
};

export default Modal;
