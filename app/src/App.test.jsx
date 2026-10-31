import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test, vi } from 'vitest'
import App from './App.jsx'
import JudulHalaman from './components/JudulHalaman.jsx'
import KotakPencarian from './components/KotakPencarian.jsx'
import KartuItem from './components/KartuItem.jsx'
import PesanStatus from './components/PesanStatus.jsx'

// Test 1: Rute tidak dikenal menampilkan 404
test('rute tidak dikenal menampilkan 404', () => {
  render(
    <MemoryRouter initialEntries={['/tidak-ada']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

// Test 2: Judul halaman ditampilkan
test('JudulHalaman menampilkan judul dan deskripsi', () => {
  render(
    <JudulHalaman
      judul="Koleksi Resep"
      deskripsi="Daftar resep masakan Nusantara"
    />,
  )

  expect(screen.getByRole('heading', { name: 'Koleksi Resep' })).toBeInTheDocument()
  expect(screen.getByText('Daftar resep masakan Nusantara')).toBeInTheDocument()
})

// Test 3: Kotak pencarian menerima input
test('KotakPencarian mengirimkan perubahan nilai', () => {
  const onUbah = vi.fn()

  render(<KotakPencarian nilai="" onUbah={onUbah} />)

  fireEvent.change(screen.getByRole('searchbox'), {
    target: { value: 'Rendang' },
  })

  expect(onUbah).toHaveBeenCalledWith('Rendang')
})

// Test 4: Kartu resep menampilkan informasi dan tautan detail
test('KartuItem menampilkan judul resep dan tautan detail', () => {
  const item = {
    id: '1',
    judul: 'Rendang',
    kategori: 'Daging',
    daerahAsal: 'Sumatera Barat',
  }

  render(
    <MemoryRouter>
      <KartuItem item={item} />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Rendang' })).toBeInTheDocument()
  expect(screen.getByText(/Sumatera Barat/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Rendang' })).toHaveAttribute(
    'href',
    '/koleksi/1',
  )
})

// Test 5: PesanStatus menampilkan pesan informasi
test('PesanStatus menampilkan pesan dengan role status', () => {
  render(<PesanStatus>Memuat data...</PesanStatus>)

  expect(screen.getByRole('status')).toHaveTextContent('Memuat data...')
})

// Test 6: PesanStatus error menggunakan role alert
test('PesanStatus error menampilkan role alert', () => {
  render(<PesanStatus jenis="error">Gagal memuat data</PesanStatus>)

  expect(screen.getByRole('alert')).toHaveTextContent('Gagal memuat data')
})