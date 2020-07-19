import React from 'react';
import {Layout, Card, SkeletonPage, SkeletonBodyText} from '@shopify/polaris';

export function SkeletonAnnotated() {
  const annotatedSkeletonBlock = <SkeletonBodyText lines={2} />;

  return (
    <SkeletonPage secondaryActions={2}>
      <Layout>
        <Layout.AnnotatedSection title={annotatedSkeletonBlock as any}>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title={annotatedSkeletonBlock as any}>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </SkeletonPage>
  );
}
