// lib/mongodb.ts
import {Db, MongoClient} from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null
const uri: string = process.env.MONGODB_URI || ''

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside env file')
}

export async function getMongoDb(): Promise<Db> {
  // If already connected, return the existing database instance
  if (db) {
    return db
  }

  // If not connected, create a new client and connect to the database
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }

  db = client.db()
  return db
}
