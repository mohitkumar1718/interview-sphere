import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResponse: text('jsonMockResponse').notNull(),
  jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
  jobDesc: varchar('jobDesc', { length: 255 }).notNull(),
  jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).notNull(),
  mockId: varchar('mockId', { length: 255 }).notNull()
});

export const UserAnswer = pgTable('UserAnswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockIdRef', { length: 255 }).notNull(),
  Question: text('Question').notNull(),
  userAns: text('userAns').notNull(),
  correctAns: text('correctAns'),
  feedback: text('feedback').notNull(),
  rating: varchar('rating', { length: 255 }).notNull(),
  UserEmail: varchar('UserEmail', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).notNull(),
});

