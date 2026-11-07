import {defineField, defineType} from 'sanity'
import {singletons} from './singletons'

const docTitle = (name: string) => singletons.find((s) => s.name === name)!.title

const img = (name: string, label: string, description?: string) =>
  defineField({name, title: label, type: 'image', options: {hotspot: true}, description})

const str = (name: string, label: string, extra: Record<string, unknown> = {}) =>
  defineField({name, title: label, type: 'string', ...extra})

const txt = (name: string, label: string, rows = 3) =>
  defineField({name, title: label, type: 'text', rows})

const strList = (name: string, label: string) =>
  defineField({name, title: label, type: 'array', of: [{type: 'string'}]})

const singleton = (name: string, fields: any[]) =>
  defineType({name, title: docTitle(name), type: 'document', fields})

export const siteSettings = singleton('siteSettings', [
  str('siteName', 'Site / Firm Name'),
  img('navbarLogo', 'Navbar Logo', 'Small icon shown next to the firm name in the top menu'),
  img('footerLogo', 'Footer Logo'),
  img('favicon', 'Browser Tab Icon (Favicon)', 'Square PNG recommended'),
  img('shareImage', 'Social Share Image', 'Shown when the link is shared on WhatsApp, Facebook etc.'),
  defineField({
    name: 'navItems',
    title: 'Menu Items',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          str('label', 'Label'),
          str('sectionId', 'Section to scroll to', {
            description: 'One of: home, practice-areas, team, contact',
          }),
        ],
        preview: {select: {title: 'label', subtitle: 'sectionId'}},
      },
    ],
  }),
  str('ctaLabel', 'Menu Button Text'),
  txt('footerAbout', 'Footer About Text'),
  str('footerQuickLinksTitle', 'Footer: Quick Links Heading'),
  str('footerPracticeTitle', 'Footer: Practice Areas Heading'),
  strList('footerPracticeAreas', 'Footer: Practice Areas List'),
  str('newsletterTitle', 'Newsletter Heading'),
  str('newsletterText', 'Newsletter Text'),
  str('newsletterPlaceholder', 'Newsletter Input Placeholder'),
  str('copyrightText', 'Copyright Name'),
  str('privacyLabel', 'Privacy Link Text'),
  str('termsLabel', 'Terms Link Text'),
  str('seoTitle', 'SEO Title'),
  txt('seoDescription', 'SEO Description'),
  strList('seoKeywords', 'SEO Keywords'),
])

export const heroSection = singleton('heroSection', [
  str('headingLine1', 'Heading - Line 1'),
  str('headingLine2', 'Heading - Line 2'),
  txt('description', 'Description', 5),
  img('image', 'Hero Image'),
  str('badgeTitle', 'Badge - Title'),
  str('badgeSubtitle', 'Badge - Subtitle'),
])

export const clientsSection = singleton('clientsSection', [
  str('title', 'Heading'),
  str('subtitle', 'Sub-heading'),
  defineField({
    name: 'clients',
    title: 'Clients',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [str('name', 'Client Name'), img('logo', 'Client Logo')],
        preview: {select: {title: 'name', media: 'logo'}},
      },
    ],
  }),
])

export const practiceAreasSection = singleton('practiceAreasSection', [
  str('title', 'Heading'),
  defineField({
    name: 'areas',
    title: 'Practice Areas',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [str('title', 'Title'), txt('description', 'Description'), img('icon', 'Icon')],
        preview: {select: {title: 'title', subtitle: 'description', media: 'icon'}},
      },
    ],
  }),
])

export const teamSection = singleton('teamSection', [
  str('title', 'Heading'),
  str('subtitle', 'Sub-heading'),
  defineField({
    name: 'members',
    title: 'Team Members',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          str('name', 'Name'),
          str('role', 'Role / Designation'),
          txt('bio', 'Bio', 5),
          img('photo', 'Photo'),
        ],
        preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
      },
    ],
  }),
])

export const faqSection = singleton('faqSection', [
  str('title', 'Heading'),
  str('subtitle', 'Sub-heading'),
  defineField({
    name: 'faqs',
    title: 'Questions',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [str('question', 'Question'), txt('answer', 'Answer', 5)],
        preview: {select: {title: 'question', subtitle: 'answer'}},
      },
    ],
  }),
])

export const contactSection = singleton('contactSection', [
  str('title', 'Heading'),
  str('subtitle', 'Sub-heading'),
  str('formTitle', 'Form Heading'),
  str('successMessage', 'Success Message'),
  defineField({
    name: 'items',
    title: 'Contact Cards (offices, phone, email, hours)',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [str('title', 'Title'), txt('content', 'Content'), img('icon', 'Icon')],
        preview: {select: {title: 'title', subtitle: 'content', media: 'icon'}},
      },
    ],
  }),
  strList('caseTypes', 'Case Type Options'),
  str('submitLabel', 'Submit Button Text'),
])

export const disclaimerSection = singleton('disclaimerSection', [
  str('title', 'Title'),
  txt('text', 'Disclaimer Text', 10),
  str('checkboxLabel', 'Checkbox Label'),
  str('buttonLabel', 'Button Text'),
])

export const schemaTypes = [
  siteSettings,
  heroSection,
  clientsSection,
  practiceAreasSection,
  teamSection,
  faqSection,
  contactSection,
  disclaimerSection,
]
