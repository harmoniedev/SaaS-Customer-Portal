import React from 'react';

import { LayoutMemo as Layout } from '../../layout/Layout';
import { DashboardSceneMemo as DashboardScene } from '../../scenes/DashboardScene';

export default function Page() {
  return (
    <Layout>
      <DashboardScene />
    </Layout>
  );
}
