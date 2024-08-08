<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Resources\NewsCollection;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\delete;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(9));
        return Inertia::render('Homepage', [
            'title' => 'SAPA - Beranda',
            'description' => 'Ini adalah halaman homepage bray',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->back()->with('error', 'Anda harus login terlebih dahulu.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048' // Validasi jika ada gambar
        ]);

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = $user->email;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('public/images'); // Menyimpan gambar di direktori storage/app/public/images
            $news->image = basename($imagePath); // Simpan nama file
        }

        $news->save();
        return redirect()->back()->with('message', 'Berita berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = ($news::where('author', auth()->user()->email)->get());
        return Inertia::render('Dashboard', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'title' => 'Edit Berita',
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'image' => 'nullable|image' // jika ada image, validasi jika ada
        ]);

        $news = News::find($request->id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }

        // Update only fields that are provided
        if ($request->has('title')) {
            $news->title = $request->title;
        }
        if ($request->has('description')) {
            $news->description = $request->description;
        }
        if ($request->has('category')) {
            $news->category = $request->category;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('public/images'); // Menyimpan gambar di direktori storage/app/public/images
            $news->image = basename($imagePath); // Simpan nama file
        }
        $news->save();

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'Berita Dihapus');
    }
}
