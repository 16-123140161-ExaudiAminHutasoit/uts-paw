import { useState } from 'react'
import useKoleksi from '../hooks/useKoleksi.js'
import KotakPencarian from '../components/KotakPencarian.jsx'
import KartuItem from '../components/KartuItem.jsx'
import JudulHalaman from '../components/JudulHalaman.jsx'
import PesanStatus from '../components/PesanStatus.jsx'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')

  if (loading) return <PesanStatus>Memuat data...</PesanStatus>
  if (error) {
    return <PesanStatus jenis="error">Gagal memuat: {error}</PesanStatus>
  }

  const daftarKategori = ['Semua', ...new Set(items.map((item) => item.kategori))]
  const tampil = items.filter(
    (item) =>
      item.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === 'Semua' || item.kategori === kategori),
  )

  return (
    <section>
      <JudulHalaman judul="Koleksi" />

      <div className="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <select
          aria-label="Kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </div>

      {tampil.length === 0 ? (
        <PesanStatus>Tidak ada item yang cocok.</PesanStatus>
      ) : (
        <div className="daftar-kartu">
          {tampil.map((item) => (
            <KartuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}