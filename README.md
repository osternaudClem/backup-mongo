# Backup and Transfer Script

This project provides a Node.js script for automatically backing up a specified directory, compressing it into a ZIP file, and securely transferring it to a Synology server. It is designed to run on a Debian server and uses cron for scheduling.

## Features

- **Automatic Backup:** Zips the specified directory and saves the output in a designated location.
- **Secure Transfer:** Uses SCP (Secure Copy Protocol) to securely transfer the backup file to a Synology server.
- **Scheduled Execution:** Utilizes cron jobs for automated execution at configured times.

## Prerequisites

Ensure you have the following installed on your Debian server:

- Node.js (v12.x or newer)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd [project-folder]
   ```

````

2. **Install dependencies:**
 ```bash
 npm install
````

3. **Set up environment variables:**
   Create a .env file in the root of your project or export the variables in your environment:

```plaintext
FOLDER_TO_ZIP='/path/to/folder'
OUTPUT_PATH='/path/to/output/folder.zip'
SYNOLOGY_HOST='your-synology-ip'
SYNOLOGY_USERNAME='your-username'
SYNOLOGY_PASSWORD='your-password'
SYNOLOGY_PATH='/path/on/synology'
```

## Usage

To run the script manually, ensure the environment variables are set:

```bash
npx ts-node backup.ts
```

### Setting Up the Cron Job

To schedule the script to run automatically, ensure the environment variables are available to the cron environment, or set them directly in the crontab:

```bash
0 1 * * * /usr/bin/node /path/to/mybackupscript/dist/backup.js
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to improve the functionality or address any bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
