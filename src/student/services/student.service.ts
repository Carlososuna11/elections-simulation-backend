import { Injectable } from '@nestjs/common';
import { JsonDataService } from '@common/providers';
import Student from '@entities/student/student.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/dtos';
import { Engine } from 'typescript-business-rules-engine';
import { PostulantDto, ElectorDto } from '../dto';

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

	async findAllElectors(pageOptionsDto: PageOptionsDto): Promise<PageDto<ElectorDto>> {
		const data = await this.jsonDataService.readJsonFile();

		const engine = await Engine.import(`${__dirname}/../../../public/engines/elector/rules.tsbr`);

		const results = await Promise.all(
			data.map(async (student) => {
				const extra = (await engine.evaluate(student)).context.extra as object;
				const defaultExtra = {
					voteCU: false,
					voteDIDES: false,
					voteSchool: '',
					voteFaculty: '',
				};
				const studentInfo = student as object;
				return { ...studentInfo, ...defaultExtra, ...extra } as ElectorDto;
			})
		);

		const skip = pageOptionsDto.skip;
		const take = pageOptionsDto.take;

		const itemCount = data.length;

		const pageMetaDto = new PageMetaDto({
			itemCount,
			pageOptionsDto,
		});

		return new PageDto(results.slice(skip, skip + take), pageMetaDto);
	}

	async findAllPostulants(pageOptionsDto: PageOptionsDto): Promise<PageDto<PostulantDto>> {
		const data = await this.jsonDataService.readJsonFile();

		const engine = await Engine.import(`${__dirname}/../../../public/engines/postulant/rules.tsbr`, {
			filter: {
				error: true,
				debug: true,
				warn: true,
				info: true,
			},
		});
		const results = await Promise.all(
			data.map(async (student) => {
				const extra = (await engine.evaluate(student)).context.extra as object;
				const studentInfo = student as object;
				const defaultExtra = {
					candidateCU: false,
					candidateDIDES: false,
					candidateSchool: '',
					candidateFaculty: '',
				};
				return { ...studentInfo, ...defaultExtra, ...extra } as PostulantDto;
			})
		);

		const skip = pageOptionsDto.skip;
		const take = pageOptionsDto.take;

		const itemCount = data.length;

		const pageMetaDto = new PageMetaDto({
			itemCount,
			pageOptionsDto,
		});

		return new PageDto(results.slice(skip, skip + take), pageMetaDto);
	}
}
