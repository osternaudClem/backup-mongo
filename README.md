# MongoDB Backup Script

This Node.js script automates the process of backing up MongoDB databases and sending them via email as a zip archive.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install the dependencies:

```bash
npm install
```

3. Duplicate the `.env-sample` file and rename it to `.env`.
4. Fill in the required environment variables in the `.env` file.

## Usage

To run the backup script, execute:

```bash
npm start
```

The script will schedule the backup process to run daily at 1 AM Paris time.

## Features

- **Automatic Backup**: Backs up all MongoDB databases, excluding system databases like 'admin', 'config', and 'local'.
- **Email Notification**: Sends the backup as a zip archive via email using nodemailer.

## Configuration

### Schedule

You can customize the backup schedule by modifying the cron expression in the `schedule.scheduleJob()` function call in `index.js`.

```javascript
schedule.scheduleJob("0 1 * * *", function () {
    backupMongoDB();
});
```

### Excluded Collections

To exclude specific collections from being backed up, update the `COLLECTION_AVOID_LIST` array in `index.js`.

```javascript
const COLLECTION_AVOID_LIST = ["admin", "config", "local"];
```