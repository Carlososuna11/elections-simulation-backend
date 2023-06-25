import {
	Controller,
	Get,
	Post,
	Query,
	HttpStatus,
	UseInterceptors,
	ClassSerializerInterceptor,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	Logger,
	HttpCode,
	UnsupportedMediaTypeException,
	BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../services/student.service';
import { PageDto, PageOptionsDto } from '@common/dtos';
import Student from '@entities/student/student.entity';
import { URLS } from '@common/constants';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostulantDto, ElectorDto } from '../dto';
import { ApiPaginatedResponse, MESSAGES } from '@common/utils';
import { Engine } from 'typescript-business-rules-engine';
import { unlink } from 'fs';
import { diskStorage } from 'multer';

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

	@Post(URLS.STUDENTS.uploadEngineElectors)
	@ApiConsumes('multipart/form-data')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: MESSAGES.CREATED,
	})
	@ApiBody({
		description: 'TSBR File',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: `${__dirname}/../../../public/engines/elector/`,
				filename: (req, file, cb) => {
					const fileNameSplit = file.originalname.split('.');
					const fileExtension = fileNameSplit[fileNameSplit.length - 1];
					cb(null, `rules.${fileExtension}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				const fileNameSplit = file.originalname.split('.');
				const fileExtension = fileNameSplit[fileNameSplit.length - 1];
				if (fileExtension !== 'tsbr') {
					cb(new UnsupportedMediaTypeException('File extension is not valid. Only .tsbr files are allowed'), false);
				}
				cb(null, true);
			},
		})
	)
	@HttpCode(HttpStatus.CREATED)
	public async uploadElectorEngine(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
			})
		)
		file: Express.Multer.File
	): Promise<void> {
		try {
			await Engine.import(file.path);
		} catch (e) {
			Logger.error(e, 'ProjectsController.uploadFile');
			// Delete the file
			unlink(file.path, (err) => {
				if (err) {
					Logger.error(err, 'ProjectsController.uploadFile');
				}
			});
			throw new BadRequestException('Error Loading File: Invalid TypeScript Business Rules file');
		}
	}

	@Post(URLS.STUDENTS.uploadEnginePostulants)
	@ApiConsumes('multipart/form-data')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: MESSAGES.CREATED,
	})
	@ApiBody({
		description: 'TSBR File',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: `${__dirname}/../../../public/engines/postulant/`,
				filename: (req, file, cb) => {
					const fileNameSplit = file.originalname.split('.');
					const fileExtension = fileNameSplit[fileNameSplit.length - 1];
					cb(null, `rules.${fileExtension}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				const fileNameSplit = file.originalname.split('.');
				const fileExtension = fileNameSplit[fileNameSplit.length - 1];
				if (fileExtension !== 'tsbr') {
					cb(new UnsupportedMediaTypeException('File extension is not valid. Only .tsbr files are allowed'), false);
				}
				cb(null, true);
			},
		})
	)
	@HttpCode(HttpStatus.CREATED)
	public async uploadPostulantEngine(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
			})
		)
		file: Express.Multer.File
	): Promise<void> {
		try {
			await Engine.import(file.path);
		} catch (e) {
			Logger.error(e, 'ProjectsController.uploadFile');
			// Delete the file
			unlink(file.path, (err) => {
				if (err) {
					Logger.error(err, 'ProjectsController.uploadFile');
				}
			});
			throw new BadRequestException('Error Loading File: Invalid TypeScript Business Rules file');
		}
	}
}
