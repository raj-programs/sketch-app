import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { VscNewFile } from "react-icons/vsc";
import "../styles/alertDialog.css";

function NewFile({ onDelete }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="tool-buttons" data-name="New File">
          <VscNewFile />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="alert-overlay" />

        <AlertDialog.Content className="alert-content">

          <AlertDialog.Title className="alert-title">
            Create New File?
          </AlertDialog.Title>

          <AlertDialog.Description className="alert-description">
            Unsaved changes will be lost. This action cannot be undone.
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
                Create New
              </button>
            </AlertDialog.Action>

          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default NewFile;