import { promises as fs } from 'fs';

export const exportContext = async (context: object, path: string, name: string) => {
	const fileName = `${path}/${name}.json`;

	try {
		const file = await fs.open(fileName, 'w');
		await file.writeFile(JSON.stringify(context));
		await file.close();
	} catch (err) {
		throw new Error(err);
	}
};

export const importContext = async (path: string, name: string) => {
	const fileName = `${path}/${name}.json`;

	try {
		const file = await fs.open(fileName, 'r');
		const data = await file.readFile('utf-8');
		await file.close();
		return data;
	} catch (err) {
		throw new Error(err);
	}
};
