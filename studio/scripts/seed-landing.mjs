// Usage: SANITY_TOKEN=xxxx node scripts/seed-landing.mjs   (creates/overwrites the landing pages)
import {createClient} from '@sanity/client'
import {landingPages} from './landing-pages.mjs'

const token = process.env.SANITY_TOKEN
if (!token) throw new Error('Set SANITY_TOKEN')
const client = createClient({projectId: 'urj7gol0', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false})

let k = 0
const keyed = (arr = []) => arr.map((o) => ({_key: `k${++k}`, ...o}))
const tx = client.transaction()
for (const p of landingPages) {
  tx.createOrReplace({
    _id: `landing-${p.slug}`,
    _type: 'landingPage',
    ...p,
    slug: {_type: 'slug', current: p.slug},
    sections: keyed(p.sections),
    faqs: keyed(p.faqs),
  })
}
await tx.commit()
console.log('Seeded', landingPages.length, 'pages')
