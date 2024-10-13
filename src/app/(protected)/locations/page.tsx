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
  title: 'Lokasi'
}

const LocationsPage = () => {
  return <>
    <ContentLayout title="Lokasi">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lokasi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/*  Section Locations or others here */}
    </ContentLayout>
  </>
}

export default LocationsPage