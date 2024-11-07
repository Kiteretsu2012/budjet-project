import mongoose from 'mongoose';

const { Schema } = mongoose;

const tagSchema = new Schema({
	name: { type: String },
});

tagSchema.pre('save', function save(next) {
	const doc = this;
	doc.lastUpdated = Date.now();
	next();
});

tagSchema.pre('updateOne', function updateOne(next) {
	const doc = this;
	doc.lastUpdated = Date.now();
	next();
});

const Tag = mongoose.model('tag', tagSchema);
export default Tag;
