import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false, // __v 필드를 제거
  },
);

// 옛날 mongoose 버전, 최신은 자동 지원
//  virtual 'id' 필드: _id 값을 id로 사용,
// userSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

export const User = mongoose.model('User', userSchema);
