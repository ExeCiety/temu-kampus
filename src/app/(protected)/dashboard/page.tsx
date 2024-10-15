import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'

export const metadata: Metadata = {
  title: 'Dashboard'
}

const DashboardPage = () => {
  return <>
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/*  Section Dashboard or others here */}
    </ContentLayout>
  </>
}

export default DashboardPage