import React from "react";
import { useGlobalContext } from "./Context";

const Modal = () => {
  const { playAgain, correct, questions } = useGlobalContext();
  return (
    <main>
      <div className="modal-container isOpen">
        <div className="modal-content">
          <h2>congrats!</h2>
          <p>
            You answered {(correct / questions.length) * 100}% of questions
            correctly
          </p>
          <button className="close-btn" onClick={playAgain}>
            play again
          </button>
        </div>
      </div>
    </main>
  );
};

export default Modal;
