import { MongoClient as Mongo, Db, AuthMechanism } from 'mongodb'

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const url = process.env.MONGODB_URL || ''

    const client = new Mongo(url, {
      auth: {
        username,
        password
      },
      authSource: 'dashboard-db',
      authMechanism: AuthMechanism.MONGODB_SCRAM_SHA1
    })

    const db = client.db('dashboard-db')

    this.client = client
    this.db = db

    console.log('mongodb is running')
  }
}
