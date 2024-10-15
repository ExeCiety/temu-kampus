import type { Metadata } from 'next'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Kalendar'
}

const CalendarPage = () => {
  return (
    <>
      <ContentLayout title="Kalendar">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Kalendar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/*  Section Calendar or others here */}
      </ContentLayout>
    </>
  )
}

export default CalendarPage