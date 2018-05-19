'use strict';

module.exports = {
	schema: {
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		gender: {
			type: String,
			required: false,
			default: 'male'
		},
		password: {
			type: String,
			required: true
		},
		dob: {
			type: Date,
			required: false
		},
		deactivated: {
			type: Boolean,
			required: false,
			default: false
		},
		type: {
			type: String,
			required: false
		}
	},

    // instance methods goes here
	methods: {

	},

    // statics methods goes here
	statics: {
	}
};