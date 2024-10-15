import { EventParticipant } from '@prisma/client'

export const eventSections = {
  upcoming: {
    label: 'Yang Akan Datang',
    value: 'upcoming'
  },
  past: {
    label: 'Selesai',
    value: 'past'
  },
  owned: {
    label: 'Milik Saya',
    value: 'owned'
  },
  participated: {
    label: 'Yang Diikuti',
    value: 'participated'
  }
}

export const getEventConfirmationLink = (eventParticipant: EventParticipant) => {
  return `${process.env.APP_HOST}/confirm-event-participant?token=${eventParticipant.id}`
}
