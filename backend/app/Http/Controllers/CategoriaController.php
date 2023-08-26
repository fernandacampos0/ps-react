<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;

class CategoriaController extends Controller
{
    private Categoria $categoria;

    public function __construct(Categoria $categoria){
        $this->categoria = $categoria;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoria = $this->categoria->with('produtos')->get();
        return response()->json($this->categoria->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request)
    {
        $data = $request->validated();
        $categoria = $this->categoria->create($data);
        return response()->json($categoria);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categoria = $this->categoria->with('produtos')->find($id);
        return response()->json($categoria);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, $id)
    {
        $data = $request->validated();
        $categoria = $this->categoria->find($id);
        $categoria->update($data); 
        return response()->json($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $categoria = $this->categoria->newQuery()->findOrFail($id);
        $categoria->delete();
        return "Categoria deletada";
    }
}
