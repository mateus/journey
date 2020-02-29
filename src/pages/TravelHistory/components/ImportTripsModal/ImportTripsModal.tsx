import React, {useState, useCallback} from 'react';
import faker from 'faker';
import PapaParse from 'papaparse';
import {
  Caption,
  DropZone,
  Modal,
  Stack,
  Link,
  Scrollable,
  Icon,
  Thumbnail,
  Tooltip,
  TextStyle,
} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';

import {Trip} from 'types';

import './ImportTripsModal.scss';

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
  const [canSubmit, setCanSubmit] = useState(false);
  const [dropZoneKey, setDropZoneKey] = useState(faker.random.uuid());
  const [files, setFiles] = useState<File[]>([]);
  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['text/csv'];
  const fileUpload = files.length ? null : <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && renderLoadedFileSection(files[0]);

  return (
    <Modal
      title="Import trips"
      open={open}
      onClose={handleOnClose}
      primaryAction={{
        content: 'Import trips',
        onAction: handleImportTripsSubmit,
        loading: Boolean(loading),
        disabled: !canSubmit || Boolean(loading),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleOnClose,
        },
      ]}
      sectioned
    >
      {uploadedFiles || renderDropZoneSection()}
    </Modal>
  );

  function renderDropZoneSection() {
    return (
      <Stack vertical>
        <p>
          Select a <TextStyle variation="strong">CSV</TextStyle> file with the
          following format:
        </p>
        <div className="Example">
          <Scrollable horizontal shadow>
            <TextStyle variation="code">
              <div>Start Date, End Date, Country, Location</div>
              <div>
                &quot;Jan 10, 2020&quot;, &quot;Jan 20, 2020&quot;,
                &quot;Canada&quot;, &quot;Montreal, QC&quot;
              </div>
              <div>
                &quot;January 10, 2020&quot;, &quot;January 20, 2020&quot;,
                Canada, &quot;Montreal, QC&quot;
              </div>
              <div>10/01/2020, 20/01/2020, Canada, Montreal</div>
            </TextStyle>
          </Scrollable>
        </div>
        <DropZone
          key={dropZoneKey}
          allowMultiple={false}
          onDrop={handleDropZoneDrop}
          accept={validImageTypes.join(', ')}
        >
          {fileUpload}
        </DropZone>
      </Stack>
    );
  }

  function renderLoadedFileSection(file: File) {
    const data = PapaParse.parse(file, {
      error(err) {
        throw new Error(err.message);
      },
      complete(results) {
        console.log(results.data);
        setCanSubmit(true);
      },
    });
    const source =
      validImageTypes.indexOf(file.type) > 0
        ? window.URL.createObjectURL(files)
        : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304';

    return (
      <Stack vertical>
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
        {data}
      </Stack>
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
