import * as SQLite from 'expo-sqlite';

export const databasePromise = SQLite.openDatabaseAsync(
    "stop-scout.db"
);

export async function initializeDB(){
    const db = await databasePromise;

    await db.execAsync(
        `PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            passwordHash TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS stops (
            stopId INTEGER PRIMARY KEY,
            stopName TEXT NOT NULL,
            stopDesc TEXT,
            stopLat REAL NOT NULL,
            stopLon REAL NOT NULL,
            isFavorite INTEGER NOT NULL DEFAULT 0
        );`
    );
    return db;
}