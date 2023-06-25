import { ApiProperty } from '@nestjs/swagger';

export class FiredRuleDto {
	@ApiProperty({
		description: 'Rule name',
		type: String,
	})
	name: string;

	@ApiProperty({
		description: 'Rule description',
		type: String,
	})
	description: string;
}
