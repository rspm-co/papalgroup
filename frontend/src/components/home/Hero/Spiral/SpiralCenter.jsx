const SpiralCenter = ({ center }) => {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[rgba(255,255,255,0.9)] p-6 text-center shadow-[0_18px_52px_rgba(26,26,26,0.1)] backdrop-blur-2xl">
      <span className="text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-[var(--color-black)]">
        {center?.name}
      </span>
    </div>
  )
}

export default SpiralCenter
