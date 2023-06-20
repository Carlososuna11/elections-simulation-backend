import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import Student from '@entities/student/student.entity';

@Injectable()
export class JsonDataService {
	// dataFilePath is the public folder (/public/data/student.json)
	private readonly dataFilePath = join(__dirname, '../../../public/data/students.json');
	async readJsonFile(): Promise<Student[]> {
		try {
			const fileContent = await readFile(this.dataFilePath, 'utf-8');
			return JSON.parse(fileContent);
		} catch (error) {
			throw new Error(`Error al leer el archivo JSON: ${error.message}`);
		}
	}
}
