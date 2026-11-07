// Seeds the Sanity dataset with the website's current content.
// Usage:  SANITY_TOKEN=xxxx node scripts/seed.mjs
import {createClient} from '@sanity/client'
import {readFileSync, existsSync} from 'node:fs'
import {resolve, dirname, basename} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../../public')
const defaults = JSON.parse(readFileSync(resolve(__dirname, '../../src/content/defaults.json'), 'utf8'))

const token = process.env.SANITY_TOKEN
if (!token) throw new Error('Set SANITY_TOKEN')

const client = createClient({
  projectId: 'urj7gol0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const IMAGE_KEYS = new Set(['navbarLogo', 'footerLogo', 'favicon', 'shareImage', 'image', 'logo', 'icon', 'photo'])
const cache = new Map()

async function uploadImage(src) {
  if (cache.has(src)) return cache.get(src)
  let body, filename
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src)
    if (!res.ok) throw new Error(`Download failed ${src}: ${res.status}`)
    body = Buffer.from(await res.arrayBuffer())
    filename = 'hero-image.jpg'
  } else {
    const p = resolve(publicDir, '.' + src)
    if (!existsSync(p)) throw new Error(`Missing file ${p}`)
    body = readFileSync(p)
    filename = basename(p)
  }
  const asset = await client.assets.upload('image', body, {filename})
  const ref = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  cache.set(src, ref)
  console.log('  uploaded', src)
  return ref
}

let keyCounter = 0
async function transform(value, key) {
  if (Array.isArray(value)) {
    const out = []
    for (const v of value) {
      const t = await transform(v)
      out.push(typeof t === 'object' && t !== null ? {_key: `k${++keyCounter}`, ...t} : t)
    }
    return out
  }
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = await transform(v, k)
    return out
  }
  if (typeof value === 'string' && IMAGE_KEYS.has(key)) return uploadImage(value)
  return value
}

for (const [id, data] of Object.entries(defaults)) {
  console.log('Seeding', id)
  const doc = await transform(data)
  await client.createOrReplace({_id: id, _type: id, ...doc})
}
console.log('Done.')
