import React from 'react';
import {
  Layout,
  Card,
  SkeletonPage,
  SkeletonBodyText,
  TextContainer,
} from '@shopify/polaris';

export function SkeletonTwoColumn() {
  return (
    <SkeletonPage secondaryActions={1}>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonBodyText />
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonBodyText />
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Card.Section>
              <TextContainer>
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
          <Card subdued>
            <Card.Section>
              <TextContainer>
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
