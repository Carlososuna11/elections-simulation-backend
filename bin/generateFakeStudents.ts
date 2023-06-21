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
	{ name: 'Ingeniería Informática', value: 'IINF', facultyCode: 'FING', years: 5 },
	{ name: 'Ingeniería Civil', value: 'ICIV', facultyCode: 'FING', years: 5 },
	{ name: 'Ingeniería Industrial', value: 'IIND', facultyCode: 'FING', years: 5 },
	{ name: 'Ingeniería Telecomunicaciones', value: 'ITEL', facultyCode: 'FING', years: 5 },
	{ name: 'Arquitectura', value: 'ARQ', facultyCode: 'FING', years: 5 },
	{ name: 'Filosofía', value: 'FIL', facultyCode: 'FAHD', years: 4 },
	{ name: 'Psicología', value: 'PSI', facultyCode: 'FAHD', years: 5 },
	{ name: 'Letras', value: 'LET', facultyCode: 'FAHD', years: 4 },
	{ name: 'Comunicación Social', value: 'COM', facultyCode: 'FAHD', years: 5 },
	{ name: 'Educación', value: 'EDU', facultyCode: 'FAHD', years: 4 },
	{ name: 'Administración de Empresas', value: 'ADE', facultyCode: 'FACES', years: 5 },
	{ name: 'Contaduría Pública', value: 'CON', facultyCode: 'FACES', years: 5 },
	{ name: 'Relaciones Industriales', value: 'RIN', facultyCode: 'FACES', years: 4 },
	{ name: 'Sociología', value: 'SOC', facultyCode: 'FACES', years: 4 },
	{ name: 'Economía', value: 'ECO', facultyCode: 'FACES', years: 4 },
	{ name: 'Derecho', value: 'DER', facultyCode: 'FDER', years: 5 },
	{ name: 'Teología', value: 'TEO', facultyCode: 'FTEO', years: 5 },
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
	{ name: 'Primer Semestre', value: 1 },
	{ name: 'Segundo Semestre', value: 2 },
	{ name: 'Tercer Semestre', value: 3 },
	{ name: 'Cuarto Semestre', value: 4 },
	{ name: 'Quinto Semestre', value: 5 },
	{ name: 'Sexto Semestre', value: 6 },
	{ name: 'Séptimo Semestre', value: 7 },
	{ name: 'Octavo Semestre', value: 8 },
	{ name: 'Noveno Semestre', value: 9 },
	{ name: 'Décimo Semestre', value: 10 },
];

const currentSemesterUC = [
	{ semester: 1, value: 0, years: 0 },
	{ semester: 2, value: 25, years: 1 },
	{ semester: 3, value: 50, years: 1 },
	{ semester: 4, value: 77, years: 2 },
	{ semester: 5, value: 109, years: 2 },
	{ semester: 6, value: 170, years: 3 },
	{ semester: 7, value: 204, years: 3 },
	{ semester: 8, value: 229, years: 4 },
	{ semester: 9, value: 259, years: 4 },
	{ semester: 9, value: 297, years: 5 },
];

function randomEnrolledSemester(semesterCode: number, currentSemester: boolean, dateBase: Date): EnrolledSemester {
	let failedSubjects = faker.number.int({ min: 0, max: 20 });
	if (failedSubjects > 1) failedSubjects = 0;
	else failedSubjects = 1;

	const startDate = new Date(dateBase);
	startDate.setMonth(startDate.getMonth() + semesterCode * 6 - 6);
	const endDate = new Date(dateBase);
	endDate.setMonth(endDate.getMonth() + semesterCode * 6 - 1);

	return {
		semesterCode,
		failedSubjects,
		enrolledUC: faker.number.int({ min: 26, max: 31 }),
		currentSemester,
		startDate,
		endDate,
	};
}

function randomMajor(): Major {
	const numSemesters = faker.number.int({ min: 1, max: 10 });
	const currentSemester = semester[numSemesters - 1].value;

	// segun la cantidad de semestres, se calcula los años hacia atras
	const years = currentSemesterUC[numSemesters - 1].years;
	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - years);

	const enrolledSemesters = Array.from({ length: numSemesters }, (_, i) => {
		const semesterCode = semester[i].value;
		const currentSemester = i === numSemesters - 1;
		return randomEnrolledSemester(semesterCode, currentSemester, startDate);
	});

	const minApprovedUC = numSemesters - 2 < 0 ? 0 : currentSemesterUC[numSemesters - 2].value;

	const majorSelected = faker.helpers.arrayElement(major);

	return {
		majorCode: majorSelected.value,
		startDate: faker.date.past(),
		endDate: faker.date.future(),
		approvedUC: faker.number.int({ min: minApprovedUC, max: currentSemesterUC[numSemesters - 1].value }),
		currentSemester: currentSemester,
		currentSemesterUC: faker.number.int({ min: 26, max: 31 }),
		enrolledSemesters,
		facultyCode: majorSelected.facultyCode,
		currentEnrolledSemester: enrolledSemesters[numSemesters - 1],
		years: majorSelected.years,
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
	} else {
		endDate = faker.date.future();
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
	fs.writeFile(`${__dirname}/../public/data/students.json`, JSON.stringify(students, null, 2), (err) => {
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
