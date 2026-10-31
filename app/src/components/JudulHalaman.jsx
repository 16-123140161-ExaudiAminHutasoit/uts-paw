export default function JudulHalaman({ judul, deskripsi = '' }) {
  return (
    <div className="judul-halaman">
      <h1>{judul}</h1>
      {deskripsi && <p>{deskripsi}</p>}
    </div>
  )
}