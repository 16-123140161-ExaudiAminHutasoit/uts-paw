export default function PesanStatus({ jenis = 'info', children }) {
  const peran = jenis === 'error' ? 'alert' : 'status'

  return (
    <p className={`pesan-status pesan-${jenis}`} role={peran}>
      {children}
    </p>
  )
}