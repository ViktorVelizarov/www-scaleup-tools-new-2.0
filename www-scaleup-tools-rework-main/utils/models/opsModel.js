import mongoose, { Schema, models } from 'mongoose';
import { privacyPolicyConnection } from '../connectDB';

const editorDataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ops: [
      {
        attributes: Object,
        insert: String,
      },
    ],
  },
  { collection: 'editorData' }
);

const EditorData =
  models.EditorData ||
  privacyPolicyConnection.model('EditorData', editorDataSchema);

export default EditorData;
