import mongoose, { Schema } from 'mongoose';

export interface TaskDocument extends Document {
	__v: number;
	_id: string;
	title: string;
	content: string;
	jobId: string;
	scheduledDate: Date;
	reminded: boolean;
	done: boolean;
	user: Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema<TaskDocument>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		jobId: { type: String, required: true },
		scheduledDate: { type: Date, required: true },
		reminded: { type: Boolean, default: false },
		done: { type: Boolean, default: false },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

export default mongoose.model<TaskDocument>('Task', TaskSchema);
