import type { Metadata } from 'next'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Acara'
}

const EventsPage = () => {
  return (
    <>
      <ContentLayout title="Acara">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acara</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/*  Section Events or others here */}
      </ContentLayout>
    </>
  )
}

export default EventsPage