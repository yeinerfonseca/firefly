import { relations } from 'drizzle-orm'
import { blob, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'

export const games = sqliteTable('games', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  title: text().notNull(),
  description: text().notNull(),
  thumbnail: blob(),
  companyId: text().notNull(),
  trailerId: text().references(() => brands.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const gamesRelations = relations(games, ({ many, one }) => ({
  gamesCategories: many(gamesOnCategories),
  company: one(brands, {
    fields: [games.companyId],
    references: [brands.id],
  }),
  trailer: one(trailers),
}))

export const trailers = sqliteTable('trailers', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  url: text().notNull(),
})

export const trailersRelations = relations(trailers, ({ one }) => ({
  game: one(games, { fields: [trailers.id], references: [games.id] }),
}))

export const categories = sqliteTable('categories', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text().notNull(),
  slug: text(),
})

export const categoryRelations = relations(categories, ({ many }) => ({
  gamesToCategories: many(gamesOnCategories),
}))

export const gamesOnCategories = sqliteTable(
  'games_categories',
  {
    gameId: text('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    categoryId: text('category_id')
      .notNull()
      .references(() => categories.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.gameId, table.categoryId] }),
  }),
)

export const gamesOnCategoriesRelations = relations(
  gamesOnCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [gamesOnCategories.categoryId],
      references: [categories.id],
    }),
    game: one(games, {
      fields: [gamesOnCategories.gameId],
      references: [games.id],
    }),
  }),
)

export const brands = sqliteTable('brands', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text().notNull(),
  image: blob(),
})

export const brandRelations = relations(brands, ({ many }) => ({
  games: many(games),
}))
