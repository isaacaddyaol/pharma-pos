'use client';

import Modal from './Modal';
import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  loading = false
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return 'ri-error-warning-line text-red-600';
      case 'warning':
        return 'ri-alert-line text-yellow-600';
      case 'info':
        return 'ri-information-line text-blue-600';
      default:
        return 'ri-question-line text-gray-600';
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger' as const;
      case 'warning':
        return 'primary' as const;
      case 'info':
        return 'primary' as const;
      default:
        return 'primary' as const;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <i className={`${getIcon()} text-2xl`}></i>
          </div>
          <div className="flex-1">
            <p className="text-gray-700">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={getConfirmVariant()}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}