import mongoose, { Schema, InferSchemaType } from "mongoose";

/**
 * required: true で「存在必須」
 * ただし空文字 "" も「存在」とみなされるため、空文字禁止は minlength と validator で。
 * trim: true で前後空白を自動除去。
 */
const TodoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "テキストは必須です"],
      trim: true,
      minlength: [1, "空文字は禁止です"],
      validate: {
        validator: (v: string) => typeof v === "string" && v.trim().length > 0,
        message: "空白のみの文字列は禁止です"
      }
    }
  },
  { timestamps: true }
);

export type Todo = InferSchemaType<typeof TodoSchema>;
export const TodoModel =
  mongoose.models.Todo || mongoose.model<Todo>("todolist", TodoSchema);
