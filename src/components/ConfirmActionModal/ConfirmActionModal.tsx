import React from 'react';
import {Modal, ModalProps} from '@shopify/polaris';

export interface ConfirmActionModalProps extends ModalProps {
  title: string;
  details: string | React.ReactNode;
  primaryActionLabel: string;
  open: boolean;
  destructive: boolean;
  loading?: boolean;
  onClose(): void;
  onConfirmed(): void;
}

export function ConfirmActionModal({
  open,
  destructive,
  title,
  details,
  primaryActionLabel,
  loading,
  onClose,
  onConfirmed,
  ...rest
}: ConfirmActionModalProps) {
  return (
    <Modal
      {...rest}
      title={title}
      open={open}
      onClose={onClose}
      primaryAction={{
        content: primaryActionLabel,
        onAction: onConfirmed,
        destructive,
        loading: Boolean(loading),
        disabled: Boolean(loading),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
      sectioned
    >
      {details}
    </Modal>
  );
}
