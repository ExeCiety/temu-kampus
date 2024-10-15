import cron from 'node-cron'
import { sendEmailEventConfirmationJob } from '@/lib/jobs'

// Schedule the task to run daily at 9 AM
cron.schedule('19 01 * * *', async () => {
  await sendEmailEventConfirmationJob()
})
