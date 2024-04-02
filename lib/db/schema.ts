import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createSelectSchema, jsonSchema } from 'drizzle-zod'

export type DayDate = {
    year: number
    month: number
    day: number
}

export const Tusers = sqliteTable('users', {
    id: integer('id').primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
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
    owner: integer('owner').notNull().references(()=>Tusers.id),
    addedAt: integer('added_at', {
        mode: 'timestamp'
    }).notNull().$defaultFn(()=>new Date()),
    note: text('note')
})



export const Idays = {
    select: createSelectSchema(Tdays)
}