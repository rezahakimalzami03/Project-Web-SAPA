import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NewsList from '@/Components/Homepage/NewsList';
import Paginator from '@/Components/Homepage/Paginator';

export default function Homepage(props) {
    console.log('props : ', props)
    return (
        <>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://cdn.pixabay.com/photo/2017/06/02/17/47/friendship-2366955_1280.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="w-10/12">
                        <h1 className="mb-5 text-4xl font-bold text-white"><span className='text-5xl'>SAPA</span> <br />(Sistem Aduan Perempuan dan Anak)</h1>
                        <div className='w-8/12 mx-auto'>
                            <p className="mb-5 text-xl">
                                Aplikasi SAPA adalah sebuah platform digital yang dirancang untuk memfasilitasi pengaduan kasus kekerasan terhadap perempuan dan anak di Banjarmasin. Aplikasi ini memungkinkan pengguna untuk membuat akun, mengisi biodata, dan mengajukan laporan pengaduan melalui formulir online yang mendetail.
                            </p>
                        </div>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-nowrap justify-center items-center lg:flex-row lg:flex-wrap lg:items-stretch py-10 gap-6 bg-gray-600'>
                <NewsList news={props.news.data} />
            </div>
            <div className='flex justify-center bg-gray-600 py-6'>
                <Paginator meta={props.news.meta} />
            </div>
            <div>
                <a href="/formulir">
                    <button>Tekannnn</button>
                </a>
            </div>
        </>
    )
}