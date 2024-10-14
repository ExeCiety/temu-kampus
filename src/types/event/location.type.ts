export type CreateLocationRequest = {
  name: string
  address: string
}

export type GetLocationsRequest = {
  //
}

export type GetLocationDetailRequest = {
  locationId: string
}

export type UpdateLocationRequest = {
  locationId: string,
  name?: string
  address?: string
}

export type BulkDeleteLocationRequest = {
  locationIds: string[]
}
