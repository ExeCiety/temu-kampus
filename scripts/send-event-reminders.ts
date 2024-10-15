import cron from 'node-cron'
import { prisma } from '@/lib/prisma'

import { sendEmailEventReminder } from '@/actions/email.action'
import { eventParticipateStatuses } from '@/lib/helpers/event-participate.helper'

// Schedule the task to run daily at 9 AM
cron.schedule('00 08 * * *', async () => {
  console.log('Checking for upcoming events...')

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  try {
    // Find all events starting in exactly 1 day
    const upcomingEvents = await prisma.event.findMany({
      where: {
        dateStart: {
          gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
          lt: new Date(tomorrow.setHours(23, 59, 59, 999))
        }
      },
      include: {
        participants: {
          where: {
            status: eventParticipateStatuses.participated.value
          },
          include: {
            user: true
          }
        }
      }
    })

    for (const event of upcomingEvents) {
      // Send reminders to all participants
      for (const participant of event.participants) {
        await sendEmailEventReminder({ to: participant?.user?.email || '' })
      }

      console.log(`Event reminder ${event.id} to ${event.participants.length} participants`)
    }
  } catch (error) {
    console.error('Error sending event reminders:', error)
  } finally {
    await prisma.$disconnect()
  }
})
