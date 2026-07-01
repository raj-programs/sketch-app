import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { VscNewFile } from "react-icons/vsc";

function NewFile({ onDelete }) {

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="tool-buttons" data-name="NEW">
          <VscNewFile />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="alert-overlay" />

        <AlertDialog.Content className="alert-content">
          <AlertDialog.Title>
            Create New File?
          </AlertDialog.Title>

          <AlertDialog.Description>
            Unsaved changes will be lost.
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
                onClick={() => onDelete()}
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