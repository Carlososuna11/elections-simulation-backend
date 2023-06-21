import { ApiProperty } from '@nestjs/swagger';
import EnrolledSemester from './enrolledSemester.entity';
import { Type } from 'class-transformer';
export default class Major {
	@ApiProperty({
		description: 'The id of the major',
		type: String,
		uniqueItems: true,
	})
	majorCode: string;

	@ApiProperty({
		description: 'The code of the faculty',
		type: String,
	})
	facultyCode: string;

	@ApiProperty({
		description: 'The Start Date of the major',
		type: Date,
	})
	@Type(() => Date)
	startDate: Date;

	@ApiProperty({
		description: 'The End Date of the major',
		type: Date,
	})
	@Type(() => Date)
	endDate: Date;

	@ApiProperty({
		description: 'Number of Approved UC',
		type: Number,
	})
	approvedUC: number;

	@ApiProperty({
		description: 'Current Semester based on the Approved UC',
		type: Number,
	})
	currentSemester: number;

	@ApiProperty({
		description: 'UC that the current semester should have',
		type: Number,
	})
	currentSemesterUC: number;

	@ApiProperty({
		description: 'The list of enrolled semesters',
		type: [EnrolledSemester],
	})
	enrolledSemesters: EnrolledSemester[];

	@ApiProperty({
		description: 'The actual enrolled semester',
		type: EnrolledSemester,
	})
	currentEnrolledSemester: EnrolledSemester;

	@ApiProperty({
		description: 'Number of years of the student',
		type: Number,
	})
	years: number;

	@ApiProperty({
		description: 'Has repeated Semester?',
		type: Boolean,
	})
	hasRepeatedSemester: boolean;
}
