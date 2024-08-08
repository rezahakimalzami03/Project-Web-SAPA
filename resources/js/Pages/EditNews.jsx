import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title || "");
    const [description, setDescription] = useState(props.myNews.description || "");
    const [category, setCategory] = useState(props.myNews.category || "");
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Set initial values from props.myNews when the component mounts
        setTitle(props.myNews.title);
        setDescription(props.myNews.description);
        setCategory(props.myNews.category);
    }, [props.myNews]);

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
            text: 'Apakah anda yakin ingin mengubah berita?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Kirim',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('id', props.myNews.id);
            if (title !== props.myNews.title) {
                formData.append('title', title);
            }
            if (description !== props.myNews.description) {
                formData.append('description', description);
            }
            if (category !== props.myNews.category) {
                formData.append('category', category);
            }
            if (image) {
                formData.append('image', image);
            }

            try {
                await Inertia.post('/news/update', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Berita berhasil diperbaharui!',
                    icon: 'success',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui berita.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="py-12 bg-gray-400 h-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm p-6 mt-10 rounded-md">
                        <div className="bg-card p-6">
                            <h2 className="text-xl font-semibold text-black">Edit Data Pengajuan</h2>
                            <div className="card-body">
                                <div className="label">
                                    <span className="text-black">Masukkan Judul Pengaduan</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Judul"
                                    className="input input-bordered bg-white w-full"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                                <div className="label">
                                    <span className="text-black">Masukkan Deskripsi Pengaduan</span>
                                </div>
                                <textarea
                                    placeholder="Deskripsi"
                                    className="bg-white border-gray-300 textarea textarea-bordered textarea-lg max-w-xl"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                                <div className="label">
                                    <span className="text-black">Masukkan Kategori Pengaduan</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Kategori"
                                    className="input input-bordered w-full bg-white"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                />
                                <label className="form-control max-w-lg my-2 ml-2">
                                    <div className="label">
                                        <span className="text-black">Masukkan Gambar (Opsional)</span>
                                    </div>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered max-w-xs"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </label>
                                <button className='btn btn-primary m-2' onClick={handleSubmit}>UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNews;
