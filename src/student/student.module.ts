import { Module } from '@nestjs/common';
import { DataService } from './services/student.service';
import { StudentsController } from './controllers/student.controller';
@Module({
	controllers: [StudentsController],
	providers: [DataService],
})
export class StudentsModule {}
