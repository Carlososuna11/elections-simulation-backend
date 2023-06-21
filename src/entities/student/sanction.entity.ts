import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export default class Sanction {
	@ApiProperty({
		description: 'The id of the sanction',
		type: String,
		uniqueItems: true,
	})
	sanctionCode: string;

	@ApiProperty({
		description: 'Start Date of the sanction',
		type: Date,
	})
	@Type(() => Date)
	startDate: Date;

	@ApiProperty({
		description: 'End Date of the sanction',
		type: Date || undefined,
	})
	@Type(() => Date)
	endDate?: Date;
}
