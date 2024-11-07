import mongoose from 'mongoose';

const { Schema } = mongoose;

const orgSchema = new Schema({
	name: { type: String, unique: true },
	description: String,
	joiningCode: { type: String, unique: true },
	creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
});

orgSchema.pre('save', function save(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

orgSchema.pre('updateOne', function updateOne(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

const Organization = mongoose.model('organizations', orgSchema);
export default Organization;
