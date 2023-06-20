import { ApiProperty } from '@nestjs/swagger';
import Major from './major.entity';

export default class Elector {
	@ApiProperty({
		description: 'The id of the elector',
		type: String,
		uniqueItems: true,
	})
	id: string;

	@ApiProperty({
		description: 'The name of the elector',
		type: String,
	})
	estuNombre: string;

	@ApiProperty({
		description: 'The DNI of the elector',
		type: String,
	})
	estuCedula: string;

	@ApiProperty({
		description: 'Status Inscription',
		type: String,
	})
	estuStatusInscCode: string;

	@ApiProperty({
		description: 'Level Code of the elector',
		type: String,
	})
	programLevelCode: string;

	@ApiProperty({
		description: 'Campus Code of the elector',
		type: String,
	})
	programCampCode: string;

	@ApiProperty({
		description: 'List of majors of the elector',
		type: [Major],
	})
	majors: Major[];

	@ApiProperty({
		description: '¿Can the elector vote for the CU? (true/false/undefined)',
		type: Boolean || undefined,
	})
	votaCU?: boolean;

	@ApiProperty({
		description: '¿Can the elector vote for the DIDES? (true/false/undefined)',
		type: Boolean || undefined,
	})
	votaDIDEs?: boolean;

	@ApiProperty({
		description: '¿School to which the elector belongs?',
		type: String || undefined,
	})
	votaEscuela?: string;

	@ApiProperty({
		description: 'Falculty to which the elector belongs?',
		type: String || undefined,
	})
	votaFacultad?: string;

	@ApiProperty({
		description: 'Currer Major of the elector (Principal)',
		type: Major || undefined,
	})
	currentMainDegree?: Major;
}
