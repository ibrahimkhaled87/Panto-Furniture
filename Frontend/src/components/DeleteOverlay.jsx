import axios from "axios";
import { createPortal } from "react-dom";

export default function DeleteOverlay({id, onClose}) {
  if (!id) return null;

  async function handleConfirm() {
    try {
      await axios.delete("/products", {data: {id: id}});
      onClose();
    } catch (error) {

    }
  }

  return createPortal(
    <div className="overlay">
      <div className="modal">
        <p>Are you sure you want to delete product {id}?</p>
        <div className="buttons">
          <button onClick={() => handleConfirm()}>Confirm</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}