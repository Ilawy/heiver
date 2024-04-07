import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createSelectSchema, jsonSchema } from 'drizzle-zod'




export type DayDate = {
    year: number
    month: number
    day: number
}

export const Tusers = sqliteTable('users', {
    id: text('id').primaryKey().notNull(),
    name: text('name'),
    email: text('email').notNull().unique("email_unique"),
    username: text('username').notNull().unique("username_unique"),
    password: text('password').notNull()
})

export const Tdays = sqliteTable('days', {
    id: integer('id').primaryKey().notNull(),
    date: text('date', {
        mode: "json"
    }).notNull().$type<DayDate>(),
    religion: integer('religion').notNull(),
    life: integer('life').notNull(),
    health: integer('health').notNull(),
    owner: text('owner').notNull().references(()=>Tusers.id),
    addedAt: integer('added_at', {
        mode: 'timestamp'
    }).notNull().$defaultFn(()=>new Date()),
    note: text('note')
})

export const Tsessions = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => Tusers.id),
	expiresAt: integer("expires_at").notNull()
});





export const Idays = {
    select: createSelectSchema(Tdays)
}