import fs from "fs";
import dotenv from "dotenv";
import archiver from "archiver";

import logging from "./loggingUtils";

dotenv.config();

const BACKUP_FOLDER_PATH = "./backups";
const ZIP_FOLDER_PATH = "./temp";
const ZIP_FILE_NAME = "mongodb_backup.zip";

export const createBackupFolder = async () => {
  if (!fs.existsSync(BACKUP_FOLDER_PATH)) {
    fs.mkdirSync(BACKUP_FOLDER_PATH);
  }
};

export const createZipFolder = async () => {
  if (!fs.existsSync(ZIP_FOLDER_PATH)) {
    fs.mkdirSync(ZIP_FOLDER_PATH);
  }
};

export const saveJsonBackup = async (
  dbName: string,
  collectionName: string,
  jsonData: string
) => {
  const filename = `${dbName}_${collectionName}.json`;
  fs.writeFileSync(`${BACKUP_FOLDER_PATH}/${filename}`, jsonData);
};

export const createZip = async () => {
  try {
    logging.info("Creating zip file...");

    const output = fs.createWriteStream(`${ZIP_FOLDER_PATH}/${ZIP_FILE_NAME}`);

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(BACKUP_FOLDER_PATH, false);
    await archive.finalize();

    logging.success("Zip file created successfully.");
  } catch (error) {
    logging.error("Error creating zip file.", error);
    throw new Error(`Error creating zip file: ${error}`);
  }
};

export const deleteFolder = async () => {
  logging.info("Deleting backup folder...");

  // Delete all files in the backup folder
  fs.readdirSync(BACKUP_FOLDER_PATH).forEach((file) => {
    fs.unlinkSync(`${BACKUP_FOLDER_PATH}/${file}`);
  });

  fs.rmdirSync(BACKUP_FOLDER_PATH);

  logging.success("Backup folder deleted successfully.");
};

export const deleteZipFolder = async () => {
  logging.info("Deleting zip folder...");

  fs.unlinkSync(`${ZIP_FOLDER_PATH}/${ZIP_FILE_NAME}`);
  fs.rmdirSync(ZIP_FOLDER_PATH);

  logging.success("Zip folder deleted successfully.");
};
