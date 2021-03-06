import { Factory, faker } from 'ember-cli-mirage';

export default function () {

	this.namespace = '/';

	this.timing = 200;

	// this.get('/authors', (schema) => {
	// 	return schema.authors.all();
	// });

	this.get('/people', () => {
		return {
			'data': [{
				'type': 'person',
				'id': '1143111',
				'attributes': {
					'FirstName': 'Jeff',
					'LastName': 'Atwood',
					'ThePersonSelfHeight': 175,
					'Birthday': new Date('2018-11-11 ').getTime()
					// 'firstName': 'Jeff',
					// 'lastName': 'Atwood',
					// 'thePersonSelfHeight': 175,
					// 'birthday': new Date('2018-11-11 11:11:11').getTime()
				}
			}, {
				'type': 'person',
				'id': '111112',
				'attributes': {
					'FirstName': 'Yehuda',
					'LastName': 'Katz',
					'ThePersonSelfHeight': 168,
					'Birthday': new Date('2011-11-11 ').getTime()
					// 'firstName': 'Yehuda',
					// 'lastName': 'Katz',
					// 'thePersonSelfHeight': 168,
					// 'birthday': new Date('2011-11-11 11:11:11').getTime()
				}
			}]
		};
	});

	this.post('/articles');
	/**
	 * modelName: post
	 * not support filter
	 * relationship hasMany - comments
	 */
	this.get('/posts', ({ posts }, request) => {
		return posts.all();
		/*
		return {
			'data': [{
				'type': 'post',
				'id': 'idPost1',
				'attributes': {
					'title': 'post1',
					'content': 'post content'
				},
				'relationships': {
					'comments': {
						'data': [
							{
								'id': 1,
								'type': 'comment'
							},
							{
								'id': 2,
								'type': 'comment'
							}
						]
					}
				}
			}]
			// 'included': [{
			// 	'type': 'comment',
			// 	'id': 1,
			// 	'attributes': {
			// 		'commentator': 'Jeff',
			// 		'content': 'Good Very Good',
			// 		'time': new Date('2018-11-01').getTime(),
			// 		'isLike': true,
			// 		'reply': 115
			// 	}
			// }, {
			// 	'type': 'comment',
			// 	'id': 2,
			// 	'attributes': {
			// 		'commentator': 'Tom',
			// 		'content': 'NOt GOOD ENOUGH',
			// 		'time': new Date('2018-11-08').getTime(),
			// 		'isLike': false,
			// 		'reply': 555
			// 	}
			// }]

		};*/
	});


	/**
	 * modelName: post
	 * use to create a new record
	 */
	this.post('posts', ({ posts }, request) => {
		let newRecord = JSON.parse(request.requestBody).data.attributes,
			post = posts.create(newRecord);

		post.save();
		return post;
	});

	/**
	 * modelName: post
	 * support filter by id
	 */
	this.get('/posts/:id', ({ posts }, request) => {
		let post = posts.find(request.params.id);

		return post;
	});
	/**
	 * modelName: post
	 * use to update record by record id
	 */
	this.patch('/posts/:id', ({ posts }, request) => {
		let id = request.params.id,
			post = posts.find(id),
			totalUpdateRecord = JSON.parse(request.requestBody).data.attributes;

		post.update(totalUpdateRecord);
		return post;
	});
	/**
	 * modelName: author
	 * not support filter
	 * relationship hasMany - posts
	 */
	this.get('authors', ({ authors }, request) => {
		return authors.all();
	});
	/*
			this.get('/comments/:id', (schema, request) => {
				let id = request.params.id;

				if (id === '1') {
					return {
						'data': {
							'type': 'comment',
							'id': 1,
							'attributes': {
								'commentator': 'Jeff',
								'content': 'Good Very Good',
								'time': new Date('2018-11-01').getTime(),
								'isLike': true,
								'reply': 115
							}
						}
					};
				}
				return {
					'data': {
						'type': 'comment',
						'id': 2,
						'attributes': {
							'commentator': 'Tom',
							'content': 'NOt GOOD ENOUGH',
							'time': new Date('2018-11-08').getTime(),
							'isLike': false,
							'reply': 555
						}
					}
				};
			});

			this.get('/comments', (schema, request) => {
				return {
					'data': [{
						'type': 'comment',
						'id': 1,
						'attributes': {
							'commentator': 'Jeff',
							'content': 'Good Very Good',
							'time': new Date('2018-11-01').getTime(),
							'isLike': true,
							'reply': 115
						}
					}, {
						'type': 'comment',
						'id': 2,
						'attributes': {
							'commentator': 'Tom',
							'content': 'NOt GOOD ENOUGH',
							'time': new Date('2018-11-08').getTime(),
							'isLike': false,
							'reply': 555
						}
					}]
				};
			});
	*/
	this.get('/campuses', () => {
		return {
			'data': [{
				'type': 'campus',
				'id': 1,
				'attributes': {
					'name': 'HNUST',
					'rank': 233
				}
			},
			{
				'type': 'campus',
				'id': 2,
				'attributes': {
					'name': 'HNU',
					'rank': 56
				}
			}]
		};
	});

	this.get('/bjCompanies', ({ bjCompanies }, request) => {
		return bjCompanies.all();
	});
	/**
	 * modelName: company
	 * only support filter-isLocation
	 * relationship hasMany - phone
	 */
	this.get('/companies', ({ companies }, request) => {
		let comp = [];

		if (Object.keys(request.queryParams).length === 0) {
			comp = companies.all();
		} else {
			let filteredisLocale = request.queryParams['filter[isLocation]'] !== 'false';

			comp = companies.where({ isLocation: filteredisLocale });
		}
		return comp;
	});

	this.get('/phones', ({ phones }, request) => {
		return phones.all();
	});

	this.get('/phones/:id', ({ phones }, request) => {
		let id = request.params.id,
			phone = phones.find(id);

		return phone;
	});
	// this.get('/bjCompanies/:id', ({ bjCompanies }, request) => {
	// 	let id = request.params.id,
	// 		company = bjCompanies.find(id);

	// 	return company;
	// });
	this.patch('/bjCompanies/:id', ({ bjCompanies }, request) => {
		let id = request.params.id,
			company = bjCompanies.find(id);

		company.update({
			'name': faker.company.companyName(),
			'location': faker.address.streetAddress(),
			'employee': faker.random.number()
		});
		return company;
	});
}
