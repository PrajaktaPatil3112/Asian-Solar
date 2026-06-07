import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Zap, IndianRupee, Gauge, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'

// ── Estimation assumptions (transparent, India-tuned, NOT a binding quote) ──
const TARIFF = 8 // ₹ per unit (kWh) — typical residential slab
const GEN_PER_KW_PER_DAY = 4 // units a 1 kW rooftop system generates per day
const COST_PER_KW = 60000 // ₹ approx installed cost per kW (before subsidy)

function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function SolarCalculator() {
  const [bill, setBill] = useState(3000)

  const result = useMemo(() => {
    const monthlyUnits = bill / TARIFF
    const dailyUnits = monthlyUnits / 30
    const rawKw = dailyUnits / GEN_PER_KW_PER_DAY
    // round up to the nearest 0.5 kW, min 1 kW
    const systemKw = Math.max(1, Math.round(rawKw * 2) / 2)
    const yearlyGeneration = systemKw * GEN_PER_KW_PER_DAY * 365
    const yearlySavings = Math.min(yearlyGeneration * TARIFF, bill * 12)
    const systemCost = systemKw * COST_PER_KW
    const paybackYears = yearlySavings > 0 ? systemCost / yearlySavings : 0
    return { systemKw, yearlySavings, systemCost, paybackYears }
  }, [bill])

  return (
    <section id="calculator" className="section-pad bg-gradient-to-br from-brand-blue to-brand-blueDark text-white">
      <div className="container-px">
        <SectionHeading
          inverted
          eyebrow="Solar Calculator"
          title="Estimate Your Solar Savings"
          subtitle="Move the slider to your average monthly electricity bill and see your potential savings instantly."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white/10 p-8 backdrop-blur"
          >
            <div className="mb-6 flex items-center gap-3">
              <Calculator className="h-7 w-7 text-brand-orange" />
              <h3 className="text-xl font-semibold text-white">Your Electricity Bill</h3>
            </div>

            <label className="mb-2 block text-sm text-slate-200">Average monthly bill</label>
            <div className="mb-4 text-4xl font-extrabold text-brand-orange">{formatINR(bill)}</div>

            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full accent-brand-orange"
              aria-label="Monthly electricity bill"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-300">
              <span>₹500</span>
              <span>₹50,000</span>
            </div>

            <label className="mb-2 mt-6 block text-sm text-slate-200">
              Or type your exact monthly bill (₹)
            </label>
            <input
              type="number"
              min="0"
              value={bill}
              onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </motion.div>

          {/* Result card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white p-8 text-slate-800 shadow-soft dark:bg-slate-900 dark:text-slate-100"
          >
            <h3 className="mb-6 text-xl font-semibold">Your Estimated Solar Plan</h3>

            <div className="space-y-4">
              <ResultRow
                icon={Gauge}
                label="Recommended System Size"
                value={`${result.systemKw} kW`}
                color="text-brand-blue"
              />
              <ResultRow
                icon={IndianRupee}
                label="Estimated Yearly Savings"
                value={formatINR(result.yearlySavings)}
                color="text-brand-green"
              />
              <ResultRow
                icon={Zap}
                label="Approx. System Cost (before subsidy)"
                value={formatINR(result.systemCost)}
                color="text-brand-orange"
              />
              <ResultRow
                icon={Calculator}
                label="Estimated Payback Period"
                value={`${result.paybackYears.toFixed(1)} years`}
                color="text-brand-blue"
              />
            </div>

            <p className="mt-5 text-xs text-slate-400">
              * Estimates only, based on ₹{TARIFF}/unit and {GEN_PER_KW_PER_DAY} units/kW/day.
              Government subsidy can reduce the cost further. Request a free survey for an exact quote.
            </p>

            <Button href="#contact" className="mt-6 w-full">
              Get My Exact Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ResultRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className={`text-lg font-bold ${color}`}>{value}</span>
    </div>
  )
}
