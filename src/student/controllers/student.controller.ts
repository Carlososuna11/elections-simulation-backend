import {
	Controller,
	Get,
	Query,
	HttpStatus,
	UseInterceptors,
	ClassSerializerInterceptor,
	HttpCode,
} from '@nestjs/common';
import { DataService } from '../services/student.service';
import { PageDto, PageOptionsDto } from '@common/dtos';
import Student from '@entities/student/student.entity';
import { URLS } from '@common/constants';
import { ApiTags } from '@nestjs/swagger';
import { PostulantDto, ElectorDto } from '../dto';
import { ApiPaginatedResponse } from '@common/utils';

@Controller(URLS.STUDENTS.base)
@ApiTags('Students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentsController {
	constructor(private readonly studentsService: DataService) {}

	// list all Students
	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ApiPaginatedResponse(Student)
	async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
		return this.studentsService.findAll(pageOptionsDto);
	}

	// list all Electors
	@Get(URLS.STUDENTS.electors)
	@HttpCode(HttpStatus.OK)
	@ApiPaginatedResponse(Student)
	async findAllElectors(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ElectorDto>> {
		return this.studentsService.findAllElectors(pageOptionsDto);
	}

	// list all Postulants
	@Get(URLS.STUDENTS.postulants)
	@HttpCode(HttpStatus.OK)
	@ApiPaginatedResponse(Student)
	async findAllPostulants(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<PostulantDto>> {
		return this.studentsService.findAllPostulants(pageOptionsDto);
	}
}
