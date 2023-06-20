import { Type, applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function PaginateQueryOptions() {
	return applyDecorators(
		ApiQuery({ name: 'page', required: false, description: 'Page number (starting from 1)', example: 1 }),
		ApiQuery({ name: 'limit', required: false, description: 'Number of records per page', example: 10 }),
		ApiQuery({ name: 'search', required: false, description: 'Multicolumn search term' }),
		ApiQuery({
			name: 'searchBy',
			required: false,
			description: "Limit columns to which apply 'search' term",
			isArray: true,
			type: 'string',
		}),
		ApiQuery({
			name: 'sortBy',
			required: false,
			description: 'Format: _field_:_direction_ [direction may be ASC or DESC] e.g. id:DESC',
		})
	);
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				properties: {
					data: {
						type: 'array',
						items: { $ref: getSchemaPath(model) },
					},
					meta: {
						type: 'object',
						properties: {
							itemsPerPage: {
								type: 'number',
							},
							totalItems: {
								type: 'number',
							},
							currentPage: {
								type: 'number',
							},
							totalPages: {
								type: 'number',
							},
							sortBy: {
								type: 'array',
								items: {
									type: 'array',
									items: {
										type: 'string',
									},
								},
							},
							searchBy: {
								type: 'array',
								items: {
									type: 'object',
								},
							},
							search: {
								type: 'string',
							},
							select: {
								type: 'array',
								items: {
									type: 'string',
								},
							},
							filter: {
								type: 'object',
								properties: {},
							},
						},
					},
					links: {
						type: 'object',
						properties: {
							first: {
								type: 'string',
							},
							previous: {
								type: 'string',
							},
							current: {
								type: 'string',
							},
							next: {
								type: 'string',
							},
							last: {
								type: 'string',
							},
						},
					},
				},
			},
		})
	);
};
