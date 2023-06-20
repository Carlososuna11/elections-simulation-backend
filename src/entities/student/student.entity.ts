import { ApiProperty } from '@nestjs/swagger';
import Major from './major.entity';
import Sanction from './sanction.entity';

export default class Student {
	@ApiProperty({
		description: 'The id of the student',
		type: String,
		uniqueItems: true,
	})
	id: string;

	@ApiProperty({
		description: 'The name of the student',
		type: String,
	})
	estuNombre: string;

	@ApiProperty({
		description: 'The DNI of the student',
		type: String,
	})
	estuCedula: string;

	@ApiProperty({
		description: 'Status Inscription',
		type: String,
	})
	estuStatusInscCode: string;

	@ApiProperty({
		description: 'Level Code of the student',
		type: String,
	})
	programLevelCode: string;

	@ApiProperty({
		description: 'Campus Code of the student',
		type: String,
	})
	programCampCode: string;

	@ApiProperty({
		description: 'List of majors of the student',
		type: [Major],
	})
	majors: Major[];

	@ApiProperty({
		description: 'List of sanctions of the student',
		type: [Sanction],
	})
	sanctions: Sanction[];
}
