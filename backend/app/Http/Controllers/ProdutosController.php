<?php

namespace App\Http\Controllers;

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

    public function index()
    {
        $produt = $this->produtos->with('categorias')->get();
        return response()->json($produt);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProdutosRequest $request)
    {
        $data = $request->validated();
        if($request->hasFile('Imagem')){
            $data['Imagem'] = $request->file('Imagem')->store('Imagem', 'public');
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
        $produtos = $this->produtos->find($id);
        if($request->hasFile('Imagem')){
            Storage::disk('public')->delete($produtos->Imagem);
            $data['Imagem'] = $request->file('Imagem')->store('Imagem', 'public');    
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
       Storage::disk('public')->delete($produtos->Imagem);
       $produtos->delete();
       return "Produto deletado";
    }
}
