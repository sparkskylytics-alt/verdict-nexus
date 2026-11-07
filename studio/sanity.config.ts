import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletons} from './schemaTypes/singletons'

const singletonIds: string[] = singletons.map((s) => s.name)

export default defineConfig({
  name: 'default',
  title: 'Verdict Nexus',
  projectId: 'urj7gol0',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            S.listItem().title('Service / City Pages (SEO)').id('landingPage').child(S.documentTypeList('landingPage').title('Service / City Pages')),
            S.divider(),
            ...singletons.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.name)
                .child(S.document().schemaType(s.name).documentId(s.name).title(s.title)),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonIds.includes(schemaType)),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((o) => !singletonIds.includes(o.templateId)),
    actions: (prev, {schemaType}) =>
      singletonIds.includes(schemaType)
        ? prev.filter(({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },
})
