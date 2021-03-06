import DS from 'ember-data';
import { camelize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend({
	pathForType(type) {
		let newType = pluralize(camelize(type));

		return newType;
	},
	// generateIdForRecord(store, type, inputProperties) {
	// 	return 343;
	// },
	shouldBackgroundReloadAll() {

		return false;
	},
	shouldReloadAll(store, snapshotRecordArray) {
		return !snapshotRecordArray.length;
	}

});
