import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MdDelete } from "react-icons/md";
import "../styles/alertDialog.css";

function DeleteFile({ onDelete }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="tool-buttons" data-name="DELETE">
          <MdDelete />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="alert-overlay" />

        <AlertDialog.Content className="alert-content">

          <AlertDialog.Title className="alert-title">
            Delete Drawing?
          </AlertDialog.Title>

          <AlertDialog.Description className="alert-description">
            Are you sure you want to delete this drawing? This action cannot be undone.
          </AlertDialog.Description>

          <div className="alert-buttons">

            <AlertDialog.Cancel asChild>
              <button className="cancel-btn">
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                className="confirm-btn"
                onClick={onDelete}
              >
                Delete
              </button>
            </AlertDialog.Action>

          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteFile;