import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const getImageUrl = (imageName) => {
    return `/storage/images/${imageName}`; // Update path as needed based on storage link
};

export default function Dashboard(props) {
    console.log(props);
    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        console.log('props', props)
        return;
    }, []);

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg max-w-lg">
                        <div className="p-6 text-white font-bold text-xl bg-sky-600"><>Selamat Datang, </>{props.auth.user.name}!</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm p-6 mt-10 rounded-md">
                        <div className="bg-card p-6">
                            <h2 className="text-xl font-semibold mb-4 text-black">Pengajuan Aduan Kamu!</h2>
                            <table className="min-w-full border-collapse border border-border">
                                <thead>
                                    <tr className="bg-gray-200 border text-black">
                                        <th className="border border-black p-2 text-center">Gambar</th>
                                        <th className="border border-black p-2 text-center">Judul</th>
                                        <th className="border border-black p-2 text-center">Kategori</th>
                                        <th className="border border-black p-2 text-center">Deskripsi</th>
                                        <th className="border border-black p-2 text-center">Author</th>
                                        <th className="border border-black p-2 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.myNews && props.myNews.length > 0 ? (
                                        props.myNews.map((news, index) => (
                                            <tr key={index} className="border-b border-border">
                                                <td className="p-2 text-center">
                                                    <img src={getImageUrl(news.image)} alt="News" className="w-24 h-16 object-cover mx-auto" />
                                                </td>
                                                <td className="border border-border p-2 text-center">{news.title}</td>
                                                <td className="border border-border p-2 text-center">{news.category}</td>
                                                <td className="border border-border p-2">{news.description}</td>
                                                <td className="border border-border p-2 text-center">{news.author}</td>
                                                <td className="border border-border p-2 text-center">
                                                    <div className='flex'>
                                                        <Link className="bg-blue-500 text-white p-2 rounded" href={route('edit.news')} method='get' data={{ id: news.id }} as='button'>Edit
                                                        </Link>
                                                        <Link className="bg-red-500 text-white p-2 ml-2 rounded" href={route('delete.news')} method='post' data={{ id: news.id }} as='button'>Hapus
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-2 text-center">Tidak ada data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
