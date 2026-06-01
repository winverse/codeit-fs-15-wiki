import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { NotFoundException } from '../errors/notFoundException.js';
import { User } from '../models/user.model.js';
import { ConflictException } from '../errors/conflictException.js';

export const userRouter = express.Router();

// GET /users - 모든 사용자 조회
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users, count: users.length });
  } catch (error) {
    next(error);
    return;
  }
});

// GET /users/:id - 특정 사용자 조회
userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
    return;
  }
});

// POST /users - 새 사용자 생성
userRouter.post('/', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    const isDuplicatedEmail = !!existingUser;

    if (isDuplicatedEmail) {
      throw new ConflictException('중복된 이메일 입니다.');
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
      message: '사용자가 생성되었습니다',
    });
  } catch (error) {
    next(error);
    return;
  }
});

// PATCH /users/:id - 사용자 정보 업데이트
userRouter.patch('/:id', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { id: userId } = req.params;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    const isDuplicatedEmail = !!existingUser;

    if (isDuplicatedEmail) {
      throw new ConflictException('중복된 이메일 입니다.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({
      success: true,
      data: updatedUser,
      message: '사용자가 수정되었습니다',
    });
  } catch (error) {
    next(error);
    return;
  }
});

// DELETE /users/:id - 사용자 삭제
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({ success: true, message: '사용자가 삭제되었습니다' });
  } catch (error) {
    next(error);
    return;
  }
});

// GET /users/:userId/posts/:postId - 중첩 리소스
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
