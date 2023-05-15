import { access, mkdir } from 'fs/promises';

export class FileManager {
  static async getDirAccess(path: string) {
    try {
      await access(path);
    } catch (error) {
      await mkdir(path);
    } finally {
      return true;
    }
  }
}
