import { Module } from '@nestjs/common';
import { DataService } from './services/student.service';
import { StudentsController } from './controllers/student.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
	imports: [
		MulterModule.register({
			dest: `${__dirname}/../../public/engines/`,
		}),
	],
	controllers: [StudentsController],
	providers: [DataService],
})
export class StudentsModule {}
