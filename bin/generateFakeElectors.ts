import * as faker from 'faker';
import Elector from '@entities/elector/elector.entity';
import Major from '@entities/elector/major.entity';
import EnrolledSemester from '@entities/elector/enrolledSemester.entity';

function randomEnrolledSemester(): EnrolledSemester {
	return {
		semesterCode: faker.random.alphaNumeric(10),
		allSubjectsApproved: faker.random.boolean(),
		enrolledUC: faker.random.number({ min: 1, max: 10 }),
		currentSemester: faker.random.boolean(),
	};
}

function randomMajor(): Major {
	const numSemesters = faker.random.number({ min: 1, max: 10 });
	const enrolledSemesters = Array.from({ length: numSemesters }, () => randomEnrolledSemester());

	return {
		majorCode: faker.random.alphaNumeric(10),
		startDate: faker.date.past(),
		endDate: faker.date.future(),
		approvedUC: faker.random.number({ min: 1, max: 250 }),
		currentSemester: faker.random.word(),
		currentSemesterUC: faker.random.number({ min: 1, max: 10 }),
		enrolledSemesters,
	};
}

function randomElector(): Elector {
	const numMajors = faker.random.number({ min: 1, max: 5 });
	const majors = Array.from({ length: numMajors }, () => randomMajor());

	return {
		id: faker.random.uuid(),
		estuNombre: faker.name.firstName(),
		estuCedula: faker.random.alphaNumeric(10),
		estuStatusInscCode: faker.random.word(),
		programLevelCode: faker.random.alphaNumeric(10),
		programCampCode: faker.random.alphaNumeric(10),
		majors,
		votaCU: faker.random.boolean(),
		votaDIDEs: faker.random.boolean(),
		votaEscuela: faker.random.boolean() ? faker.company.companyName() : undefined,
		votaFacultad: faker.random.boolean() ? faker.company.companyName() : undefined,
		currentMainDegree: majors[0],
	};
}

function generateFakeElectors(numElectors: number): Elector[] {
	return Array.from({ length: numElectors }, () => randomElector());
}

export default generateFakeElectors;
