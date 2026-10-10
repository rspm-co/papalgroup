import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const brands = [
  { name: 'Mahalaxmi Foods', src: '/brands/spiral/mahalaxmi-foods.png', x: 50, y: 13 },
  { name: 'Gauraai', src: '/brands/spiral/gauraai.png', href: 'https://gauraai.co', x: 76, y: 24 },
  { name: 'Asha Upahar Gruh', src: '/brands/spiral/asha-upahar-gruh.png', x: 87, y: 50 },
  { name: 'Brand Plus', src: '/brands/spiral/brand-plus.png', href: 'https://brandplus.papalgroup.com', x: 76, y: 76 },
  { name: 'Speedo Internet', src: '/brands/spiral/speedo.png', href: 'https://speedo.papalgroup.com', x: 50, y: 87 },
  { name: 'Ladachi Kulfi', src: '/brands/spiral/ladachi-kulfi.png', href: 'https://ladachikulfi.com', x: 24, y: 76 },
  { name: 'Tiparii', src: '/brands/spiral/tiparii.png', href: 'https://beta.tiparii.com', x: 13, y: 50 },
  { name: 'Woodley', src: '/brands/spiral/woodley.png', x: 24, y: 24 },
]

const stars = [
  [12, 17, 2], [38, 8, 1], [62, 8, 2], [86, 18, 1],
  [7, 48, 1], [18, 67, 2], [39, 31, 1], [61, 28, 1],
  [82, 53, 2], [91, 77, 1], [57, 94, 1], [43, 77, 2],
  [24, 12, 1], [48, 17, 1], [72, 13, 1], [30, 22, 2],
  [69, 35, 1], [11, 35, 1], [24, 43, 1], [76, 65, 1],
  [34, 59, 1], [67, 78, 2], [28, 88, 1], [79, 87, 1],
]

const BrandSpiral = () => (
  <div className="relative h-full w-full overflow-visible rounded-full border border-[rgba(187,155,80,0.36)] bg-[radial-gradient(circle_at_50%_46%,#1D2944_0%,#0D1428_48%,#050812_100%)] shadow-[0_24px_80px_rgba(4,8,20,0.42)]">
    <div className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-[rgba(187,155,80,0.48)] shadow-[0_0_24px_rgba(187,155,80,0.08)]" />
    <div className="pointer-events-none absolute inset-[27%] rounded-full border border-[rgba(184,204,236,0.16)]" />
    <div className="pointer-events-none absolute inset-[39%] rounded-full border border-[rgba(187,155,80,0.18)]" />
    {stars.map(([left, top, size], index) => (
      <span
        key={`star-${index}`}
        className="pointer-events-none absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        style={{ left: `${left}%`, top: `${top}%`, height: `${size}px`, width: `${size}px` }}
        aria-hidden="true"
      />
    ))}
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
    >
      {brands.map((brand, index) => (
        <motion.div
          key={brand.name}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 sm:h-20 sm:w-20"
          style={{ left: `${brand.x}%`, top: `${brand.y}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, rotate: -360 }}
          whileHover={{ scale: 1.12, zIndex: 10 }}
          whileFocus={{ scale: 1.12, zIndex: 10 }}
          transition={{
            opacity: { delay: 0.35 + index * 0.08 },
            scale: { delay: 0.35 + index * 0.08 },
            rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Link
            to={brand.href || '/brands'}
            target={brand.href ? '_blank' : undefined}
            rel={brand.href ? 'noopener noreferrer' : undefined}
            aria-label={brand.href ? `Visit ${brand.name} website (opens in a new tab)` : `Explore ${brand.name} and our brands`}
            className="block h-full w-full rounded-full border border-white/70 bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-shadow hover:shadow-[0_16px_32px_rgba(187,155,80,0.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-500)] sm:p-4"
          >
            <img src={brand.src} alt={`${brand.name} logo`} className="h-full w-full rounded-full object-contain" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
    <motion.div
      className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-[rgba(187,155,80,0.7)] bg-white p-3 shadow-[0_16px_48px_rgba(0,0,0,0.38)]"
      animate={{ rotate: [0, 2, 0, -2, 0], scale: [1, 1.035, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src="/brands/spiral/rsp-logo.png"
        alt="R S Papal Group"
        className="h-full w-full -translate-x-[1.5%] -translate-y-[1.5%] rounded-full object-cover"
      />
    </motion.div>
  </div>
)

export default BrandSpiral
