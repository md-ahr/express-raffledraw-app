import fs from 'fs/promises';
import path from 'path';

const dbPath  = path.resolve('data', 'db.json');

export async function readFile() {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
}

export function writeFile(data) {
    await fs.writeFile(dbPath, JSON.stringify(data));
}
