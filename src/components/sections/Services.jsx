import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="services" className="section-pad bg-slate-50 dark:bg-slate-900">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Services"
          title="Complete Solar Solutions"
          subtitle="From homes to factories, we deliver end-to-end solar systems built to last and save."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={s.title} index={i} className="group bg-white dark:bg-slate-950">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="#contact" size="lg">
            Request a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
