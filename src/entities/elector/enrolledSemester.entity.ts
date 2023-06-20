import { ApiProperty } from '@nestjs/swagger';

export default class EnrolledSemester {
	@ApiProperty({
		description: 'The id of the enrolled semester',
		type: String,
		uniqueItems: true,
	})
	semesterCode: string;

	@ApiProperty({
		description: 'All subjects approved?',
		type: Boolean,
	})
	allSubjectsApproved: boolean;

	@ApiProperty({
		description: 'The number of enrolled UC',
		type: Number,
	})
	enrolledUC: number;

	@ApiProperty({
		description: 'Is Current Semester?',
		type: Boolean,
	})
	currentSemester: boolean;
}
