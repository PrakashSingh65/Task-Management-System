import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'], default: 'TODO' })
  status: string;

  @Prop({ enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' })
  priority: string;

  @Prop()
  dueDate?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);