import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
	__v: number;
	_id: string;
	name: string;
	username: string;
	email: string;
	githubId: string;
	isVerfied: boolean;
}

const UserSchema: Schema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String },
		githubId: { type: String, required: true },
		isVerfied: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

export default mongoose.model<UserDocument>('User', UserSchema);
