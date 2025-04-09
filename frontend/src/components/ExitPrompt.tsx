interface ExitPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExitPrompt({ isOpen, onClose, onConfirm }: ExitPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Êtes-vous sûr de vouloir quitter ?</h3>
        <p className="text-gray-600 mb-6">
          Si vous quittez maintenant, toutes vos informations seront perdues.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continuer
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  )
} 