import { Location, Resource } from '@prisma/client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/components/layout/admin-panel/content-layout'
import FormAddEvent from '@/app/(protected)/events/add/form-add-event'
import { getLocations } from '@/actions/location.action'
import { getResources } from '@/actions/resource.action'

const AddEventPage = async () => {
  const getAvailableLocations = async () => {
    const getLocationsRes = await getLocations()
    return getLocationsRes.data as Location[]
  }

  const locations = await getAvailableLocations()

  const getAvailableResources = async () => {
    const getLocationsRes = await getResources()
    return getLocationsRes.data as Resource[]
  }

  const resources = await getAvailableResources()

  return (
    <>
      <ContentLayout title="Acara">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acara</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Tambah</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className={'container mx-auto px-4 py-8'}>
          <h1 className="text-3xl font-bold mb-6">Tambah Acara</h1>

          <FormAddEvent locations={locations} resources={resources} />
        </div>
      </ContentLayout>
    </>
  )
}

export default AddEventPage
