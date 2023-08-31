<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produtos;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProdutosRequest;
use App\Http\Requests\UpdateProdutosRequest;
use Illuminate\Support\Facades\Storage;


class ProdutosController extends Controller
{
    private Produtos $produtos;

    public function __construct(Produtos $produtos){
        $this->produtos = $produtos;
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $produt = $this->produtos->with('categorias')->when($request->search, function ($query) use ($request){
            $query->where('nome', 'like', '%'.$request->search.'%');         
            })->paginate(10);
        return response()->json($produt);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProdutosRequest $request)
    {
        $data = $request->validated();
        if($request->hasFile('imagem')){
            $path = $request->file('imagem')->store('imagem', 'public');
            $data['imagem'] = url('storage/' . $path);
        }
        $produtos = $this->produtos->create($data);
        return response()->json($produtos);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produtos = $this->produtos->with('categorias')->find($id);
        return response()->json($produtos);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProdutosRequest $request, $id)
    {
        $data = $request->validated();
        $produtos = $this->produtos->findOrFail($id);
        if($request->hasFile('imagem')){
            Storage::disk('public')->delete($produtos->imagem);
            $path = $request->file('imagem')->store('imagem', 'public');
            $data['imagem'] = url('storage/' . $path);
               
        }
        $produtos->update($data);
        return response()->json($produtos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
       $produtos = $this->produtos->newQuery()->findOrFail($id);
       Storage::disk('public')->delete($produtos->imagem);
       $produtos->delete();
       return "Produto deletado";
    }
}
