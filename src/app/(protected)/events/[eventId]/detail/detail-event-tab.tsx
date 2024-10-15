'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileTextIcon } from 'lucide-react'
import { getUserRoleLabelFromValue } from '@/lib/helpers/user-role.helper'

const DetailEventTab = ({ event }: { event: any }) => {
  return (
    <>
      <Tabs defaultValue="participants" className="w-full">
        <TabsList>
          <TabsTrigger value="participants">Peserta</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {event.participants && event.participants.length > 0 ? (
                  event.participants.map((participant: any) => (
                    <div key={participant.id} className="flex items-center space-x-2 mb-4 last:mb-0">
                      <Avatar>
                        <AvatarImage src={participant?.user?.image} alt={participant?.user?.name} />
                        <AvatarFallback>{participant?.user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{participant?.user?.name} - {getUserRoleLabelFromValue(participant?.user?.role)}</span>
                    </div>
                  ))
                ) : (
                  <p>Belum ada peserta</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Ulasan</CardTitle>
            </CardHeader>
            <CardContent>
              {event.reviews && event.reviews.length > 0 ? (
                event.reviews.map((review: any) => (
                  <div key={review.id} className="mb-4 last:mb-0">
                    <div className="flex items-center mb-2">
                      <span className="font-bold mr-2">{review.user.name}</span>
                      <span>Rating: {review.rating}/5</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>Belum ada ulasan</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Sumber Daya Yang Dibutuhkan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {event.resources && event.resources.length > 0 ? (
                  <ul>
                    {event.resources.map((er: any) => (
                      <li key={er?.resource?.id} className="mb-2">
                        <a href={er?.resource.url} className="text-blue-600 hover:underline flex items-center">
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          {er?.resource?.name} ({er?.resource?.quantity} qty)
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Belum ada sumber daya yang dibutuhkan</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DetailEventTab
