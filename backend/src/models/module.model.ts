import mongoose, { Schema, Document } from 'mongoose';

export interface IModule extends Document {
    title: string;
    description: string;
}

const moduleSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

export default mongoose.model<IModule>('Module', moduleSchema);
