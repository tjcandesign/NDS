import { ObjectInputProps } from 'sanity'
import { Card, Stack, Text, Box } from '@sanity/ui'
import { urlFor } from '../lib/image'

/**
 * Custom Sanity input that wraps the default image field and adds a live
 * "Site Hero Preview" panel below it at the exact 4:3 aspect ratio used by
 * the project detail page hero. Updates instantly when the editor adjusts
 * the hotspot in the modal — gives Melissa a single, unambiguous preview
 * of what the site visitor will actually see, instead of the four generic
 * sample thumbnails Sanity Studio shows by default.
 *
 * The aspect ratio (4:3) is hard-coded here to match the URL builder call
 * in `app/portfolio/[slug]/page.tsx`. If we ever change the hero crop
 * dimensions on the page, update this preview to match.
 */
export function HeroCoverImageInput(props: ObjectInputProps) {
  const value = props.value as { asset?: { _ref?: string } } | undefined
  const hasAsset = Boolean(value?.asset?._ref)

  return (
    <Stack space={4}>
      {/* Default image field: upload, hotspot, crop, alt */}
      {props.renderDefault(props)}

      {/* Live preview at the actual site aspect ratio */}
      {hasAsset && (
        <Card padding={3} radius={2} shadow={1} tone="primary">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Site Hero Preview &mdash; 4:3
            </Text>
            <Box
              style={{
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                borderRadius: 4,
                background: '#f5f5f4',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(value).width(800).height(600).url()}
                alt="Hero crop preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
            <Text size={1} muted>
              This is exactly what visitors see at the top of the project
              page. Drag the hotspot circle inside the image editor to
              adjust which part stays centered.
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
