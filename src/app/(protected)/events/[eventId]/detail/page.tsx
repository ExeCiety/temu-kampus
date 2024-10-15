import { notFound } from 'next/navigation'
import { Event } from '@prisma/client'

import { getEventDetail } from '@/actions/event.action'
import { ContentLayout } from '@/components/layout/admin-panel/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import DetailEventInfo from '@/app/(protected)/events/[eventId]/detail/detail-event-info'
import DetailEventTab from '@/app/(protected)/events/[eventId]/detail/detail-event-tab'

// This would typically come from your database
async function getEvent(id: string) {
  const getEventDetailRes = await getEventDetail({ eventId: id })
  return getEventDetailRes.data as Event
}

const EventDetailPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await getEvent(params.eventId)

  if (!event) {
    notFound()
  }

  return (
    <>
      <ContentLayout title="Acara">
        <Breadcrumb className={'mb-3'}>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acara</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className={'container mx-auto px-4 py-8'}>
          <h1 className="text-3xl font-bold mb-6">Detail Acara</h1>

          <DetailEventInfo event={event} />
          <DetailEventTab event={event} />
        </div>
      </ContentLayout>
    </>
  )
}

export default EventDetailPage
