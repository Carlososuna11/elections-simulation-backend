/**
 * Pagination object for retrieving a subset of data
 * @template T - The type of data being paginated
 */
export abstract class Pagination<T> {
	/** The subset of data being returned */
	data: T[];
	/** The current page number */
	page: number;
	/** The maximum number of items per page */
	limit: number;
	/** The total number of items across all pages */
	totalCount: number;
	/** URL for the next page of data */
	next?: string;
	/** URL for the previous page of data */
	previous?: string;
}

/**
 * Paginated result containing a subset of data along with pagination information
 * @template T - The type of data being paginated
 */
export class PaginatedResult<T> extends Pagination<T> {
	/** The total number of pages in the paginated data set */
	totalPages: number;
	/** The number of items skipped in the current page */
	skippedItems: number;

	/**
	 * Determines if there is a next page of data available
	 * @returns {boolean} - True if there is a next page, false otherwise
	 */
	hasNextPage(): boolean {
		return this.page < this.totalPages;
	}

	/**
	 * Determines if there is a previous page of data available
	 * @returns {boolean} - True if there is a previous page, false otherwise
	 */
	hasPreviousPage(): boolean {
		return this.page > 1;
	}

	/**
	 * Gets the URL for the next page of data
	 * @returns {string} - The URL for the next page of data
	 */
	getNextPage(): string {
		return `?page=${this.page + 1}&limit=${this.limit}`;
	}

	/**
	 * Gets the URL for the previous page of data
	 * @returns {string} - The URL for the previous page of data
	 */
	getPreviousPage(): string {
		return `?page=${this.page - 1}&limit=${this.limit}`;
	}

	/**
	 * Constructor for creating a new PaginatedResult object
	 * @param {T[]} data - The subset of data being returned
	 * @param {number} page - The current page number
	 * @param {number} limit - The maximum number of items per page
	 * @param {number} totalCount - The total number of items across all pages
	 * @param {string} host - The host URL for the API
	 */
	constructor(data: T[], page: number, limit: number, totalCount: number, host = 'http://localhost:3000') {
		super();
		this.data = data;
		this.page = page;
		this.limit = limit;
		this.totalCount = totalCount;
		this.totalPages = Math.ceil(totalCount / limit);
		this.skippedItems = (page - 1) * limit;
		this.previous = null;
		this.next = null;
		if (this.hasPreviousPage()) {
			this.previous = `${host}${this.getPreviousPage()}`;
		}
		if (this.hasNextPage()) {
			this.next = `${host}${this.getNextPage()}`;
		}
	}
}
