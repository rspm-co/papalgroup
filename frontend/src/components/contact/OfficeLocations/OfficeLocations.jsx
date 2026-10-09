const OfficeLocations = ({ info }) => {
  return (
    <div className="rounded-[32px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-8 shadow-[0_14px_42px_rgba(26,26,26,0.06)]">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
        Corporate Office
      </p>
      <h3 className="mt-4 text-2xl font-extrabold text-[var(--color-black)]">
        {info.corporateOffice}
      </h3>
      <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
        {info.address}
      </p>
      <div className="mt-8 space-y-3 border-l-2 border-[var(--color-gold)] pl-5 text-sm font-medium text-[var(--color-gray-600)]">
        <p>{info.phone}</p>
        <p>{info.email}</p>
        <p>{info.website}</p>
      </div>
    </div>
  )
}

export default OfficeLocations
