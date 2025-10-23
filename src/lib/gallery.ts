import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'

export type GallerySectionKey = 'Cabinets' | 'House'

export type GalleryAsset = {
  section: GallerySectionKey
  key: string
  src: string
  alt: string
  lastModified?: string
}

export type GallerySections = Record<GallerySectionKey, GalleryAsset[]>

const DEFAULT_BASE_URL = 'https://protouchgallery.s3.us-east-2.amazonaws.com'

const bucketName = process.env.GALLERY_BUCKET_NAME
const region = process.env.AWS_REGION || process.env.GALLERY_BUCKET_REGION

const resolvedBaseUrl = (() => {
  const candidate = process.env.GALLERY_BUCKET_BASE_URL
    || (bucketName && region ? `https://${bucketName}.s3.${region}.amazonaws.com` : undefined)
  return (candidate || DEFAULT_BASE_URL).replace(/\/$/, '')
})()

const cabinetsPrefix = process.env.GALLERY_CABINETS_PREFIX || 'Cabinets/'
const housePrefix = process.env.GALLERY_HOUSE_PREFIX || 'House/'

const fallbackCabinetKeys = [
  `${cabinetsPrefix}buleCabinets.jpg`,
  `${cabinetsPrefix}greyCabinets.jpg`,
  `${cabinetsPrefix}greyCabinets2.jpg`,
  `${cabinetsPrefix}greyCabinets3.jpg`,
  `${cabinetsPrefix}whiteCabinets.jpg`
]

const fallbackHouseKeys = [
  `${housePrefix}1.JPEG`,
  `${housePrefix}2.JPEG`,
  `${housePrefix}3.JPEG`,
  `${housePrefix}4.JPEG`,
  `${housePrefix}brown.jpg`,
  `${housePrefix}catus.JPEG`,
  `${housePrefix}dreamHouse.jpg`,
  `${housePrefix}grey.jpg`,
  `${housePrefix}greyHouse.jpg`,
  `${housePrefix}greyHouse2.jpg`,
  `${housePrefix}inProgress.jpg`,
  `${housePrefix}nicePool.jpg`,
  `${housePrefix}offWhiteHouse.jpg`,
  `${housePrefix}outsideWorker.jpg`,
  `${housePrefix}outsideWorker2.jpg`,
  `${housePrefix}redLights.jpg`,
  `${housePrefix}tallCeiling.jpg`,
  `${housePrefix}white.jpg`
]

const hasAwsCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)

let cachedClient: S3Client | null = null

function getClient(): S3Client | null {
  if (!bucketName || !region || !hasAwsCredentials) {
    return null
  }

  if (!cachedClient) {
    cachedClient = new S3Client({
      region,
      maxAttempts: 2
    })
  }

  return cachedClient
}

function buildObjectUrl(key: string): string {
  const normalizedKey = key.replace(/^\/+/, '')
  const encodedKey = encodeKey(normalizedKey)
  return `${resolvedBaseUrl}/${encodedKey}`
}

function buildAltText(key: string): string {
  const fileName = key.split('/').pop() || key
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '')
  const readable = withoutExtension
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (readable.length > 0) {
    return readable.replace(/\b\w/g, char => char.toUpperCase())
  }

  return 'Project image'
}

function encodeKey(key: string): string {
  return key
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/')
}

function buildFallbackSections(): GallerySections {
  const toAsset = (section: GallerySectionKey) => (key: string): GalleryAsset => ({
    section,
    key,
    src: `${resolvedBaseUrl}/${encodeKey(key)}`,
    alt: buildAltText(key)
  })

  return {
    Cabinets: fallbackCabinetKeys.map(toAsset('Cabinets')),
    House: fallbackHouseKeys.map(toAsset('House'))
  }
}

async function listObjects(prefix: string, section: GallerySectionKey, client: S3Client): Promise<GalleryAsset[]> {
  const assets: GalleryAsset[] = []
  let continuationToken: string | undefined

  do {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      ContinuationToken: continuationToken
    })

    const response = await client.send(command)
    const contents = response.Contents || []

    for (const item of contents) {
      if (!item.Key || item.Size === 0) {
        continue
      }

      assets.push({
        section,
        key: item.Key,
        src: buildObjectUrl(item.Key),
        alt: buildAltText(item.Key),
        lastModified: item.LastModified?.toISOString()
      })
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
  } while (continuationToken)

  return assets
}

export async function fetchGallerySections(): Promise<GallerySections> {
  const client = getClient()

  if (!client) {
    console.warn('Gallery S3 client not configured; falling back to sample gallery assets.')
    return buildFallbackSections()
  }

  try {
    const [cabinets, house] = await Promise.all([
      listObjects(cabinetsPrefix, 'Cabinets', client),
      listObjects(housePrefix, 'House', client)
    ])

    return {
      Cabinets: cabinets,
      House: house
    }
  } catch (error) {
    console.error('Error fetching gallery assets from S3:', error)
    return buildFallbackSections()
  }
}
