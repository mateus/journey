import React, {useState, useCallback} from 'react';
import faker from 'faker';
import PapaParse from 'papaparse';
import {
  Caption,
  DropZone,
  Modal,
  Stack,
  Link,
  Icon,
  Thumbnail,
  Tooltip,
} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';

import {Trip} from 'types';

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
  const [dropZoneKey, setDropZoneKey] = useState(faker.random.uuid());
  const [files, setFiles] = useState<File[]>([]);
  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['text/csv'];
  const fileUpload = files.length ? null : <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && renderFileThumbnail(files[0]);

  return (
    <Modal
      title="Import trips"
      open={open}
      onClose={handleOnClose}
      primaryAction={{
        content: 'Import trips',
        onAction: handleImportTripsSubmit,
        loading: Boolean(loading),
        disabled: Boolean(loading),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleOnClose,
        },
      ]}
    >
      {!uploadedFiles && (
        <Modal.Section>
          <DropZone
            key={dropZoneKey}
            allowMultiple={false}
            onDrop={handleDropZoneDrop}
            accept={validImageTypes.join(', ')}
          >
            {fileUpload}
          </DropZone>
        </Modal.Section>
      )}
      {uploadedFiles}
    </Modal>
  );

  function renderFileThumbnail(file: File) {
    const data = PapaParse.parse(file, {
      complete(results) {
        console.log('Finished:', results.data);
      },
    });
    const source =
      validImageTypes.indexOf(file.type) > 0
        ? window.URL.createObjectURL(files)
        : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304';

    return (
      <>
        <Modal.Section>
          <Stack alignment="center" wrap={false}>
            <Thumbnail size="large" alt={file.name} source={source} />
            <Stack.Item fill>
              {file.name} <Caption>{file.size} bytes</Caption>
            </Stack.Item>
            <Tooltip content="Delete file">
              <Link onClick={resetDropZone}>
                <Icon source={DeleteMinor} color="inkLighter" />
              </Link>
            </Tooltip>
          </Stack>
        </Modal.Section>
        <Modal.Section>{data}</Modal.Section>
      </>
    );
  }

  function resetDropZone() {
    setDropZoneKey(faker.random.uuid());
    setFiles([]);
  }

  function handleOnClose() {
    resetDropZone();
    onClose();
  }

  function handleImportTripsSubmit() {
    onConfirmed([]);
  }
}
