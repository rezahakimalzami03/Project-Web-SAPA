import { React, useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Formulir(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const handleSubmit = async () => {
        if (props.auth.user === null) {
            Swal.fire({
                title: 'Oops!',
                text: 'Anda harus login terlebih dahulu!',
                icon: 'error',
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda yakin ingin menambahkan berita?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Kirim',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            const data = { title, description, category, image };
            Inertia.post('/news', data)
            Swal.fire({
                title: 'Berhasil!',
                text: 'Berita berhasil ditambahkan!',
                icon: 'success',
            })
        }
    };
    const reset = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setImage("");
    }

    const handleReset = () => {
        reset();
    }

    return (
        <>
            <Head title="Formulir" />
            <Navbar user={props.auth.user} />
            <div className='w-full h-screen bg-gray-500 pt-6'>
                <div className='bg-white w-1/4 ml-48 rounded-md text-xl px-7 py-4 text-black font-bold'>Formulir Pengaduan</div>
                <div className="bg-white w-9/12 mx-auto overflow-hidden shadow-sm mt-6 p-6 rounded-md">
                    <label className="form-control max-w-3xl">
                        <div className="label">
                            <span className="text-black">Masukkan Judul Pengaduan</span>
                        </div>
                        <input type="text" placeholder="Ketik Judul Berita" className="bg-gray-50 input input-bordered border-gray-300 w-full" onChange={(e) => setTitle(e.target.value)} value={title} required />
                    </label>
                    <label className="form-control max-w-3xl">
                        <div className="label">
                            <span className="text-black">Masukkan Kategori Pengaduan</span>
                        </div>
                        <input type="text" placeholder="Ketik Kategori Berita" className="bg-gray-50 input input-bordered border-gray-300 w-full" onChange={(e) => setCategory(e.target.value)} value={category} required />
                    </label>
                    <label className="form-control max-w-4xl">
                        <div className="label">
                            <span className="text-black">Masukkan Deskripsi Pengaduan</span>
                        </div>
                        <textarea
                            placeholder="Masukkan Deskripsi Berita"
                            className="bg-gray-50 border-gray-300 textarea textarea-bordered textarea-lg max-w-xl" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                    </label>
                    <label className="form-control max-w-lg my-2">
                        <div className="label">
                            <span className="text-black">Masukkan Gambar (Opsional)</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered max-w-xs" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                    <p className="text-black mt-7">Pastikan untuk memeriksa ulang semua data yang akan diunggah sebelum menekan tombol submit agar tidak ada kesalahan.</p>
                    <button className="btn btn-info text-white my-3 text-lg" onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-error text-white my-3 mx-4 text-lg" onClick={reset}>Reset</button>
                </div>
            </div>
        </>
    )
}
