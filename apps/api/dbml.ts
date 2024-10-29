import * as schema from './drizzle/schema'
import { sqliteGenerate } from 'drizzle-dbml-generator'

const out = './schema.dbml'
const relational = true
sqliteGenerate({ schema, out, relational })
console.log('✅ Created the schema.dbml file')
