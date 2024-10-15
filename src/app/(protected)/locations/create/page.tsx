import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { FormLocation } from '@/app/(protected)/locations/form-location'

export const metadata: Metadata = {
  title: 'Tambah Lokasi'
}

const LocationsCreatePage = () => {
  const breadcrumbItems = [
    { label: 'Lokasi', href: '/locations' },
    { label: 'Tambah Lokasi', isCurrent: true }
  ] as BreadcrumbItemType[]

  return <>
    <ContentLayout title="Tambah Lokasi">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <FormLocation />
      </SectionLayout>
    </ContentLayout>
  </>
}

export default LocationsCreatePage