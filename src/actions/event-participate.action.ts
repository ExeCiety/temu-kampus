import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validate } from '@/lib/validation'
import { createResponse } from '@/lib/helpers/response.helper'
import {
  GetEventParticipatesSchema,
  GetEventParticipateValues,
  UserParticipateInEventSchema,
  UserParticipateInEventValues
} from '@/schemas/event/event-participate.schema'

export const participateInEvent = async (data: UserParticipateInEventValues) => {
  try {
    // Check if the user is not logged in
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Validate the form data
    const { success, errors } = validate(UserParticipateInEventSchema, data)

    if (!success)
      return createResponse({ errors })

    // Check if the event exists and is upcoming
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      select: { dateStart: true, dateEnd: true }
    })

    if (!event) {
      return createResponse({
        message: 'Acara tidak ditemukan'
      })
    }

    // Check if the event is still upcoming
    const now = new Date()
    if (now >= event.dateEnd) {
      return createResponse({
        message: 'Acara sudah berakhir. Partisipasi ditutup.'
      })
    }
    if (now >= event.dateStart) {
      return createResponse({
        message: 'Acara sudah dimulai. Partisipasi ditutup.'
      })
    }

    // Check if the user is already participating in the event
    const existingParticipation = await prisma.eventParticipant.findUnique({
      where: {
        userId_eventId: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId
        }
      }
    })

    if (existingParticipation) {
      return createResponse({
        message: 'Anda sudah berpartisipasi dalam acara ini.'
      })
    }

    // Register the user as a participant in the event
    await prisma.$transaction(async (tx) => {
      await tx.eventParticipant.create({
        data: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId
        }
      })
    })

    return createResponse({
      success: true,
      message: 'Berhasil mendaftar dalam acara'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getEventParticipants = async (data: GetEventParticipateValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventParticipatesSchema, data)

    if (!success)
      return createResponse({ errors })

    const participants = await prisma.eventParticipant.findMany({
      where: {
        eventId: data.eventId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return createResponse({
      success: true,
      data: participants
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
