import { Schema } from 'mongoose';

export const UploadSchema = new Schema({
  id: { type: String, required: true },
  fileUrl: { type: String, required: true },
  parameter1: { type: String, required: true },
  parameter2: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
