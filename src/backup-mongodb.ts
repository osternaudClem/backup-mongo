import dotenv from "dotenv";
import schedule from "node-schedule";
import {
  createBackupFolder,
  createZip,
  createZipFolder,
  deleteFolder,
  deleteZipFolder,
  saveJsonBackup,
} from "../utils/backupUtils";
import { getCollectionJsonData, getDatabases } from "../utils/mongoUtils";
import { sendMail } from "../utils/mailUtils";

import logging from "../utils/loggingUtils";

const MongoClient = require("mongodb").MongoClient;
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const COLLECTION_AVOID_LIST = ["admin", "config", "local"];

const backupMongoDB = async () => {
  if (!MONGODB_URI) {
    logging.error("Please provide a valid MongoDB URI.");
    return;
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    const databasesList = await getDatabases(client);

    await createZipFolder();
    await createBackupFolder();

    // Loop through databases
    for (const dbInfo of databasesList) {
      const dbName = dbInfo.name;
      // Skip system databases like 'admin', 'config', and 'local'
      if (COLLECTION_AVOID_LIST.includes(dbName)) {
        continue;
      }

      // Connect to the current database
      const db = client.db(dbName);

      // Export all collections in the current database
      const collections = await db.listCollections().toArray();

      // Loop through collections
      for (const collection of collections) {
        logging.info(`Exporting ${dbName}.${collection.name}...`);
        const jsonData = await getCollectionJsonData(db, collection);

        await saveJsonBackup(dbName, collection.name, jsonData);
      }
    }
    // Close MongoDB connection
    await client.close();

    await createZip();

    await sendMail();

    await deleteFolder();
    await deleteZipFolder();
  } catch (error) {
    logging.error("Error connecting to the database: ", error);
  } finally {
    logging.success("Backup process completed.");
  }
};

// Call main function at 1 AM Paris time
schedule.scheduleJob("0 1 * * *", function () {
  backupMongoDB();
});
