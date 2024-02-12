import React from "react";

const AppPopup = ({ isOpen, onClose, data }) => {
  return (
    <>
      {isOpen && (
        <div data-testid="popup" className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={onClose}>
              Close
            </button>
            {data &&
              data.map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item?.name || "No name"}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default AppPopup;
