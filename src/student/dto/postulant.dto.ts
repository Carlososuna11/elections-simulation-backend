import Student from '@entities/student/student.entity';
import Sanction from '@entities/student/sanction.entity';
import Major from '@entities/student/major.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PostulantDto extends Student {
	@ApiProperty({
		description: 'Can be postulant for CU?',
		type: Boolean || undefined,
	})
	candidateCU?: boolean;

	@ApiProperty({
		description: 'Can be postulant for DIDES?',
		type: Boolean || undefined,
	})
	candidateDIDES?: boolean;

	@ApiProperty({
		description: 'Can be postulant for School?',
		type: String || undefined,
	})
	candidateSchool?: string;

	@ApiProperty({
		description: 'Can be postulant for Faculty?',
		type: String || undefined,
	})
	candidateFaculty?: string;

	@ApiProperty({
		description: 'Current Major',
		type: Major || undefined,
	})
	currentMajor?: Major;

	@ApiProperty({
		description: 'Last Sanction',
		type: Sanction || undefined,
	})
	lastSanction?: Sanction;
}
