// src/components/ExampleDialog.tsx
import * as Dialog from '@radix-ui/react-dialog';

export default function ExampleDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Open Dialog
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Welcome!</Dialog.Title>
          <Dialog.Description className="text-gray-600">
            This is a Radix dialog styled with Tailwind.
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
