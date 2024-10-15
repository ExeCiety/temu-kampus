'use client'

import { useRouter } from 'next/navigation'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { Event } from '@prisma/client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'
import { Button } from '@/components/ui/button'

const CardEvent = ({ event }: { event: Event }) => {
  const router = useRouter()

  const goToEventDetailPage = (eventId: string) => {
    router.push(`/events/${eventId}/detail`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {
                formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone()) + ' - ' +
                formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())
              }
            </span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{event.location.address}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => goToEventDetailPage(event.id)} className="w-full">Lihat Detail</Button>
      </CardFooter>
    </Card>
  )
}

export default CardEvent
