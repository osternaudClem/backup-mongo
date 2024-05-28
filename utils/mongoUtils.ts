import { MongoClient } from "mongodb";

export const getDatabases = async (client: MongoClient) => {
  const databasesList = await client.db().admin().listDatabases();
  return databasesList.databases;
};

export const getCollectionJsonData = async (
  db: any,
  collection: { name: string }
) => {
  const collectionName = collection.name;
  // Export collection data to JSON
  const collectionData = await db.collection(collectionName).find().toArray();
  return JSON.stringify(collectionData, null, 2);
};
