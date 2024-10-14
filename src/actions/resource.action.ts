'use server'

import { EventResource, Resource } from '@prisma/client'
import { createResponse } from '@/lib/helpers/response.helper'
import { GetEventResourcesSchema, GetEventResourcesValues } from '@/schemas/event/resource.schema'
import { validate } from '@/lib/validation'

export const getResources = async () => {
  try {
    const resources: Resource[] = await prisma.resource.findMany()

    return createResponse({
      message: 'Berhasil mendapatkan data peralatan',
      data: resources
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}

export const getEventResources = async (data: GetEventResourcesValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventResourcesSchema, data)

    if (!success)
      return createResponse({ errors })

    const resources: EventResource[] = await prisma.eventResource.findMany({
      where: {
        eventId: data.eventId
      },
      include: {
        resource: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return createResponse({
      message: 'Berhasil mendapatkan data peralatan acara',
      data: resources
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
