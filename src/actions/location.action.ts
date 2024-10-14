'use server'

import { Location } from '@prisma/client'
import { createResponse } from '@/lib/helpers/response.helper'

export const getLocations = async () => {
  try {
    const locations: Location[] = await prisma.location.findMany()

    return createResponse({
      message: 'Berhasil mendapatkan data lokasi',
      data: locations
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}
