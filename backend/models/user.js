import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		validate: { validator: validator.isEmail },
	},
});

userSchema.pre('save', function save(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

userSchema.pre('updateOne', function updateOne(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

const User = mongoose.model('user', userSchema);
export default User;
