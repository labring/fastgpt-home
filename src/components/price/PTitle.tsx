export default function PTitle({ locale }: { locale: any }) {
  return (
    <div className="text-center flex flex-col items-center" style={{ rowGap: 16 }}>
      {locale.badge && (
        <span
          className="inline-block rounded-full border bg-white/40 text-[12px] leading-[18px]"
          style={{
            padding: '6px 12px',
            borderColor: '#e5e7eb',
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
            color: 'rgb(71, 85, 105)'
          }}
        >
          {locale.badge}
        </span>
      )}
      <h1
        className="font-medium"
        style={{ fontSize: 44, lineHeight: '56px', color: '#020617', letterSpacing: '-0.88px' }}
      >
        {locale.chooseVersion}
      </h1>
      <p
        style={{ fontSize: 18, lineHeight: '30px', color: 'rgb(71, 85, 105)', letterSpacing: '-0.18px' }}
      >
        {locale.freeUse}
      </p>
    </div>
  );
}
