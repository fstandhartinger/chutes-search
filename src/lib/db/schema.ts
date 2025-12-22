import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { Document } from '@langchain/core/documents';

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey(),
  role: text('type', { enum: ['assistant', 'user', 'source'] }).notNull(),
  chatId: text('chatId').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  messageId: text('messageId').notNull(),

  content: text('content'),

  sources: text('sources', {
    mode: 'json',
  })
    .$type<Document[]>()
    .default(sql`'[]'`),
});

interface File {
  name: string;
  fileId: string;
}

export const chats = sqliteTable('chats', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: text('createdAt').notNull(),
  focusMode: text('focusMode').notNull(),
  files: text('files', { mode: 'json' })
    .$type<File[]>()
    .default(sql`'[]'`),
});

// IP-based rate limiting for free search queries
export const ipSearchLogs = sqliteTable('ip_search_logs', {
  id: integer('id').primaryKey(),
  ipAddress: text('ip_address').notNull(),
  searchDate: text('search_date').notNull(), // Format: YYYY-MM-DD
  searchCount: integer('search_count').notNull().default(0),
});
