import { sendEmailEventConfirmationJob } from '@/lib/jobs'

export async function GET() {
  await sendEmailEventConfirmationJob()
}
