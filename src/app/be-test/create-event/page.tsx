import { auth } from '@/lib/auth'
import { ButtonCreateEvent } from '@/app/be-test/create-event/button-create'

const CreateEventPage = async () => {
  const session = await auth()

  return (
    <div>
      <h1>Create Event Page</h1>
      <ButtonCreateEvent userId={session?.user?.id || ''} />
    </div>
  )
}

export default CreateEventPage
