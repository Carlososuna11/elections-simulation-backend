import Student from '@entities/student/student.entity';
import EnrolledSemester from '@entities/student/enrolledSemester.entity';
import Major from '@entities/student/major.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FiredRuleDto } from './firedRule.dto';

export class ElectorDto extends Student {
	@ApiProperty({
		description: 'Can vote for CU?',
		type: Boolean || undefined,
	})
	voteCU?: boolean;

	@ApiProperty({
		description: 'Can vote for DIDES?',
		type: Boolean || undefined,
	})
	voteDIDES?: boolean;

	@ApiProperty({
		description: 'Can vote for School?',
		type: String || undefined,
	})
	voteSchool?: string;

	@ApiProperty({
		description: 'Can vote for Faculty?',
		type: String || undefined,
	})
	voteFaculty?: string;

	@ApiProperty({
		description: 'Current Major',
		type: Major || undefined,
	})
	currentMajor?: Major;

	@ApiProperty({
		description: 'Current Enrolled Semester',
		type: EnrolledSemester || undefined,
	})
	currentEnrolledSemester?: EnrolledSemester;

	@ApiProperty({
		description: 'Fired Rules',
		type: [FiredRuleDto],
	})
	firedRules?: FiredRuleDto[];
}
