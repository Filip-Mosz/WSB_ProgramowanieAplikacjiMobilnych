import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (!dbInstance) {
        dbInstance = await SQLite.openDatabaseAsync('stopscout.db');
        await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS stops (
        stopId INTEGER PRIMARY KEY NOT NULL,
        stopName TEXT NOT NULL,
        stopDesc TEXT,
        stopLat REAL NOT NULL,
        stopLon REAL NOT NULL
      );

      CREATE TABLE IF NOT EXISTS favorites (
        userId TEXT NOT NULL,
        stopId INTEGER NOT NULL,
        stopName TEXT NOT NULL,
        stopLat REAL NOT NULL,
        stopLon REAL NOT NULL,
        notes TEXT,
        PRIMARY KEY (userId, stopId),
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_stops_coords ON stops (stopLat, stopLon);
    `);
    }
    return dbInstance;
}