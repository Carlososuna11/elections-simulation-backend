import { Injectable } from '@nestjs/common';
import { JsonDataService } from '@common/providers';
import Student from '@entities/student/student.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/dtos';

@Injectable()
export class DataService {
	constructor(private readonly jsonDataService: JsonDataService) {}

	async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
		const data = await this.jsonDataService.readJsonFile();

		const skip = pageOptionsDto.skip;
		const take = pageOptionsDto.take;

		const itemCount = data.length;

		const pageMetaDto = new PageMetaDto({
			itemCount,
			pageOptionsDto,
		});

		return new PageDto(data.slice(skip, skip + take), pageMetaDto);
	}
}
