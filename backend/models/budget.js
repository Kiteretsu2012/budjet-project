import mongoose from 'mongoose';

const { Schema } = mongoose;

const budgetSchema = new Schema({
	title: { type: String },
	organization: { type: mongoose.SchemaTypes.ObjectId, ref: 'organizations' },
	description: String,
	teams: { type: mongoose.SchemaTypes.ObjectId, ref: 'teams' },
	approvers: [{ email: String, approved: Boolean }],
});

budgetSchema.pre('save', function save(next) {
	const doc = this;
	doc.lastUpdated = Date.now();
	next();
});

budgetSchema.pre('updateOne', function updateOne(next) {
	const doc = this;
	doc.lastUpdated = Date.now();
	next();
});

const Budget = mongoose.model('budget', budgetSchema);
export default Budget;
