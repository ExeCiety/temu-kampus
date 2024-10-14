import { z, ZodType } from 'zod'
import { CreateEventReviewRequest, GetEventReviewsRequest } from '@/types/event/review.type'

export const CreateEventReviewSchema: ZodType<CreateEventReviewRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    }),
  rating: z
    .number()
    .int()
    .min(1, 'Rating harus lebih besar dari 0')
    .max(5, 'Rating harus lebih kecil dari 6'),
  comment: z
    .string()
    .min(1, 'Komentar harus diisi')
    .max(255, 'Komentar maksimal 255 karakter')
})

export const GetEventReviewsSchema: ZodType<GetEventReviewsRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    })
})

export type CreateEventReviewValues = z.infer<typeof CreateEventReviewSchema>
export type GetEventReviewsValues = z.infer<typeof GetEventReviewsSchema>
