import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/user.js';
import { sessionsCollection } from '../db/models/session.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { fifteenMinutes, thirtyDays } from '../constants/timeSet.js';

export const registerUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await usersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  await sessionsCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await sessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + fifteenMinutes),
    refreshTokenValidUntil: new Date(Date.now() + thirtyDays),
  });
};

export const logoutUser = async (sessionId) => {
  await sessionsCollection.deleteOne({ _id: sessionId });
};
const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + fifteenMinutes),
    refreshTokenValidUntil: new Date(Date.now() + thirtyDays),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await sessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await sessionsCollection.deleteOne({ _id: sessionId, refreshToken });
  return await sessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
