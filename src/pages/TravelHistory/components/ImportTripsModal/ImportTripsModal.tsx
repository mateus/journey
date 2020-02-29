import React, {useState, useCallback} from 'react';
import {Caption, DropZone, Modal, Stack, Thumbnail} from '@shopify/polaris';

import {Trip} from 'types';

import './ImportTripModal.scss';

export interface ImportTripsModalProps {
  open: boolean;
  loading?: boolean;
  onClose(): void;
  onConfirmed(trips: Trip[]): void;
}

export function ImportTripsModal({
  open,
  loading,
  onClose,
  onConfirmed,
}: ImportTripsModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['text/csv'];
  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && renderFileThumbnail(files[0]);

  return (
    <Modal
      title="Import trips"
      open={open}
      onClose={onClose}
      primaryAction={{
        content: 'Import trips',
        onAction: handleImportTripsSubmit,
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
      <DropZone
        allowMultiple={false}
        onDrop={handleDropZoneDrop}
        accept={validImageTypes.join(', ')}
      >
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </Modal>
  );

  function renderFileThumbnail(file: File) {
    const source =
      validImageTypes.indexOf(file.type) > 0
        ? window.URL.createObjectURL(files)
        : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304';

    return (
      <div className="FilesContainer">
        <Stack vertical>
          <Stack alignment="center">
            <Thumbnail size="large" alt={file.name} source={source} />
            <>
              {files[0].name} <Caption>{files[0].size} bytes</Caption>
            </>
          </Stack>
        </Stack>
      </div>
    );
  }

  function handleImportTripsSubmit() {
    onConfirmed([]);
  }
}
