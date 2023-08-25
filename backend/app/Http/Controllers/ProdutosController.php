<?php

namespace App\Http\Controllers;

use App\Models\Produtos;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProdutosRequest;
use App\Http\Requests\UpdateProdutosRequest;

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
        return response()->json($this->produtos->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProdutosRequest $request)
    {
        $data = $request->validated();
        $produtos = $this->produtos->create($data);
        return response()->json($produtos);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produtos = $this->produtos->find($id);
        return response()->json($produtos);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProdutosRequest $request, $id)
    {
        $data = $request->validated();
        $produtos = $this->produtos->find($id);
        $produtos->update($data);
        return response()->json($produtos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produtos $produtos)
    {
       $produtos->delete();
       return "Produto deletado";
    }
}
