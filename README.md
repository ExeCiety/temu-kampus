# Temu Kampus - School and Campus Event Management System

Temu Kampus is an application designed to facilitate event management within school and campus environments. This
application offers features such as user registration, event creation, participant registration, event calendar, and
post-event feedback. With Temu Kampus, all event management processes can be carried out digitally, effectively, and
efficiently.

## Demo

```
https://temu-kampus.vercel.app/
```

## Key Features

- **User Registration and Login**
    - Users (students, lecturers, admins) can register and log in to the system with appropriate access rights.

- **Event Creation and Management**
    - Users can create events, set the date, time, location, and provide detailed event descriptions.

- **Participant Registration**
    - Students and lecturers can register to attend events using the available online forms.

- **Event Calendar**
    - Displays a list of upcoming events with filter options based on event category, date, or location.

- **Notifications and Reminders**
    - Reminders are sent via email or SMS for registration confirmation and event schedule updates.

- **Venue and Resource Management**
    - Manage event locations and resources needed such as equipment and supplies.

- **Event Reviews and Feedback**
    - Users can provide reviews and feedback after the event for further evaluation.

- **Administrative Dashboard**
    - Shows statistics such as the number of registrations, attendance, and event reviews.

## Technologies Used

- **Framework:** Next.js V14
- **Package Manager:** Bun
- **Programming Language:** TypeScript
- **Database:** MongoDB
- **Authentication:** NextAuth V5

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/username/temu-kampus.git
   cd temu-kampus
   ```

2. Install dependencies using Bun:

   ```bash
   bun install
   ```

3. Run generate prisma client:

    ```bash
   bunx prisma generate
   ```

4. Run prisma db push:

    ```bash
   bunx prisma db push
   ```

5. Run the application in the development environment:

   ```bash
   bun dev
   ```

6. Access the application at `http://localhost:3000`.

## Migration and Database Seeding

Migration:

```bash
bunx prisma db push
```

Seed the database:

```bash
bun run prisma:seed
```

## License

Temu Kampus is licensed under the [MIT License](./LICENSE).
