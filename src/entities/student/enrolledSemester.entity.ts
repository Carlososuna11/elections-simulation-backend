import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export default class EnrolledSemester {
	@ApiProperty({
		description: 'The id of the enrolled semester',
		type: Number,
		uniqueItems: true,
	})
	semesterCode: number;

	@ApiProperty({
		description: 'The number of failed subjects',
		type: Number,
	})
	failedSubjects: number;

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

	@ApiProperty({
		description: 'The start date of the semester',
		type: Date,
	})
	@Type(() => Date)
	startDate: Date;

	@ApiProperty({
		description: 'The end date of the semester',
		type: Date,
	})
	@Type(() => Date)
	endDate: Date;
}
