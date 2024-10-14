import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/components/layout/admin-panel/content-layout'

export const metadata: Metadata = {
  title: 'Peralatan'
}

const ResourcesPage = () => {
  return <>
    <ContentLayout title="Peralatan">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Peralatan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/*  Section Resources or others here */}
    </ContentLayout>
  </>
}

export default ResourcesPage