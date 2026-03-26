import { getFormConfig } from '@/lib/sanity'
import { ContactForm } from './contact-form'

export default async function Page() {
  const formConfig = await getFormConfig()

  return <ContactForm formConfig={formConfig} />
}
