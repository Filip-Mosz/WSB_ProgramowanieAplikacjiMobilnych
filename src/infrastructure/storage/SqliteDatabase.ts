import * as SQLite from 'expo-sqlite';
import {BcryptPasswordHasher} from "@/src/infrastructure/security/BcryptPasswordHasher";

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
        await seedTestUser(dbInstance);//wywołanie funkcji tworzenia uzytkownika testowego
    }
    return dbInstance;
}

async function seedTestUser(db: SQLite.SQLiteDatabase) {//
    const username = 'Test';
    const password = 'test';

    const existingUser = await db.getFirstAsync(
        'SELECT id FROM users WHERE username = ?',
        [username]
    );

    if (existingUser) {
        return;
    }

    const passwordHasher = new BcryptPasswordHasher();

    const passwordHash = passwordHasher.hash(password);

    await db.runAsync(
        `INSERT INTO users (id, username, passwordHash)
     VALUES (?, ?, ?)`,
        ['test-user-001', username, passwordHash]
    );

    console.log('Utworzono użytkownika testowego.');
}