import React, {useState, useCallback} from 'react';
import faker from 'faker';
import PapaParse from 'papaparse';
import {
  Banner,
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

import {Document} from 'assets';
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
        <Banner status="info">
          Just exploring? <Link>Use sample data</Link>
        </Banner>
        <p>
          Select a <TextStyle variation="strong">CSV</TextStyle> file with the
          following format:
        </p>
        {csvExample()}
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
        // eslint-disable-next-line no-console
        console.log(results.data);
        setCanSubmit(true);
      },
    });

    return (
      <Stack vertical>
        <Stack alignment="center" wrap={false}>
          <Thumbnail size="large" alt={file.name} source={Document} />
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

  function csvExample() {
    return (
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
              Canada, Montreal QC
            </div>
            <div>10/01/2020, 20/01/2020, Canada, Montreal</div>
          </TextStyle>
        </Scrollable>
      </div>
    );
  }

  function resetDropZone() {
    setCanSubmit(false);
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
