import { z, ZodType } from 'zod'
import { GetEventResourcesRequest } from '@/types/event/resource.type'

export const GetEventResourcesSchema: ZodType<GetEventResourcesRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    })
})

export type GetEventResourcesValues = z.infer<typeof GetEventResourcesSchema>
