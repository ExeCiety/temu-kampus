import type { Metadata } from 'next'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import ListEventBySection from '@/app/(protected)/events/list-event-by-section'
import ButtonGoToAddEventPage from '@/app/(protected)/events/button-go-to-add-event-page'

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

        <div className={'container mx-auto px-4 py-8'}>
          <div className={'flex justify-between'}>
            <h1 className="text-3xl font-bold mb-6">Daftar Acara</h1>
            <ButtonGoToAddEventPage />
          </div>
          
          <ListEventBySection />
        </div>
      </ContentLayout>
    </>
  )
}

export default EventsPage
