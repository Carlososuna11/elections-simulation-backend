import { faker } from '@faker-js/faker';
import Student from '@entities/student/student.entity';
import Sanction from '@entities/student/sanction.entity';
import Major from '@entities/student/major.entity';
import EnrolledSemester from '@entities/student/enrolledSemester.entity';
import { Command } from 'commander';
import * as fs from 'fs';

const program = new Command();
program.version('1.0.0');

const major = [
	{ name: 'Ingeniería Informática', value: 'IINF' },
	{ name: 'Ingeniería Civil', value: 'ICIV' },
	{ name: 'Ingeniería Industrial', value: 'IIND' },
	{ name: 'Ingeniería Telecomunicaciones', value: 'ITEL' },
	{ name: 'Arquitectura', value: 'ARQ' },
	{ name: 'Filosofía', value: 'FIL' },
	{ name: 'Psicología', value: 'PSI' },
	{ name: 'Letras', value: 'LET' },
	{ name: 'Comunicación Social', value: 'COM' },
	{ name: 'Educación', value: 'EDU' },
	{ name: 'Administración de Empresas', value: 'ADE' },
	{ name: 'Contaduría Pública', value: 'CON' },
	{ name: 'Relaciones Industriales', value: 'RIN' },
	{ name: 'Sociología', value: 'SOC' },
	{ name: 'Economía', value: 'ECO' },
	{ name: 'Derecho', value: 'DER' },
	{ name: 'Teología', value: 'TEO' },
];

const ingressStatus = [
	{ name: 'Retiro Retroactivo', value: 'DR' },
	{ name: 'Retiro Total', value: 'DT' },
	{ name: 'Inscripción Regular', value: 'IR' },
	{ name: 'Inscripción Extemporánea', value: 'IE' },
	{ name: 'Inscripción Tardía', value: 'IT' },
	{ name: 'Modificación de Inscripción', value: 'MI' },
	{ name: 'Tesis de Grado', value: 'TG' },
];

const semester = [
	{ name: 'Primer Semestre', value: '01SE' },
	{ name: 'Segundo Semestre', value: '02SE' },
	{ name: 'Tercer Semestre', value: '03SE' },
	{ name: 'Cuarto Semestre', value: '04SE' },
	{ name: 'Quinto Semestre', value: '05SE' },
	{ name: 'Sexto Semestre', value: '06SE' },
	{ name: 'Séptimo Semestre', value: '07SE' },
	{ name: 'Octavo Semestre', value: '08SE' },
	{ name: 'Noveno Semestre', value: '09SE' },
	{ name: 'Décimo Semestre', value: '10SE' },
];

const currentSemesterUC = [
	{ semester: '01SE', value: 0, years: 0 },
	{ semester: '02SE', value: 25, years: 1 },
	{ semester: '03SE', value: 50, years: 1 },
	{ semester: '04SE', value: 77, years: 2 },
	{ semester: '05SE', value: 109, years: 2 },
	{ semester: '06SE', value: 170, years: 3 },
	{ semester: '07SE', value: 204, years: 3 },
	{ semester: '08SE', value: 229, years: 4 },
	{ semester: '09SE', value: 259, years: 4 },
	{ semester: '10SE', value: 297, years: 5 },
];

function randomEnrolledSemester(semesterCode: string, currentSemester: boolean): EnrolledSemester {
	let failedSubjects = faker.number.int({ min: 0, max: 20 });
	if (failedSubjects > 1) failedSubjects = 0;
	else failedSubjects = 1;

	return {
		semesterCode,
		failedSubjects,
		enrolledUC: faker.number.int({ min: 26, max: 31 }),
		currentSemester,
	};
}

function randomMajor(): Major {
	const numSemesters = faker.number.int({ min: 1, max: 10 });
	const currentSemester = semester[numSemesters - 1].value;

	const enrolledSemesters = Array.from({ length: numSemesters }, (_, i) => {
		const semesterCode = semester[i].value;
		const currentSemester = i === numSemesters - 1;
		return randomEnrolledSemester(semesterCode, currentSemester);
	});

	const minApprovedUC = numSemesters - 2 < 0 ? 0 : currentSemesterUC[numSemesters - 2].value;

	return {
		majorCode: faker.helpers.arrayElement(major).value,
		startDate: faker.date.past(),
		endDate: faker.date.future(),
		approvedUC: faker.number.int({ min: minApprovedUC, max: currentSemesterUC[numSemesters - 1].value }),
		currentSemester: currentSemester,
		currentSemesterUC: faker.number.int({ min: 26, max: 31 }),
		enrolledSemesters,
		years: currentSemesterUC[numSemesters - 1].years,
		hasRepeatedSemester: enrolledSemesters.some((semester) => semester.failedSubjects > 0),
	};
}

function randomSanction(): Sanction {
	const startDate = faker.date.past();
	const hasEndDate = faker.datatype.boolean();
	let endDate = undefined;
	if (hasEndDate) {
		// endDate in past with 2 days of difference
		endDate = faker.date.between({ from: startDate, to: new Date() });
	}
	return {
		sanctionCode: faker.string.uuid(),
		startDate,
		endDate,
	};
}

function randomStudent(): Student {
	let numMajors = faker.number.int({ min: 1, max: 10 });
	// if number between 1 and 8, then 1 major, else 2 majors
	if (numMajors > 8) numMajors = 2;
	else numMajors = 1;

	const majors = Array.from({ length: numMajors }, () => randomMajor());

	let numSanctions = faker.number.int({ min: 0, max: 20 });

	// if number between 0 and 15, then 0 sanctions, else X-15 sanction
	if (numSanctions > 15) numSanctions -= 15;
	else numSanctions = 0;

	const sanctions = Array.from({ length: numSanctions }, () => {
		return randomSanction();
	});

	return {
		id: faker.string.uuid(),
		estuNombre: faker.person.fullName(),
		// V-12345678
		estuCedula: `V-${faker.number.int({ min: 1000000, max: 99999999 })}`,
		estuStatusInscCode: faker.helpers.arrayElement(ingressStatus).value,
		programLevelCode: 'PR',
		programCampCode: '001',
		majors,
		sanctions,
	};
}

function generateFakeStudents(numStudents: number): void {
	const students = Array.from({ length: numStudents }, () => randomStudent());
	// save electors to file (public/data/students.json)
	// check if public/data folder exists
	try {
		fs.accessSync(`${__dirname}/../public/data`);
	} catch (error) {
		fs.mkdirSync(`${__dirname}/../public/data`);
	}
	fs.writeFile(`${__dirname}/../public/data/student.json`, JSON.stringify(students, null, 2), (err) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`Successfully generated ${numStudents} fake students.`);
	});
}

program.option('-n, --numStudents <number>', 'number of studets to generate', '1000').action((options) => {
	const numStudents = Number(options.numStudents);
	generateFakeStudents(numStudents);
});

program.parse();
