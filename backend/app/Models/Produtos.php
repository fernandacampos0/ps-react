<?php

namespace App\Models;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable =[
        'Nome',
        'Descrição',
        'Quantidade',
        'Imagem',
        'Categoria_id',
    ];

    public function categorias(){
        return $this->belongsTo(Categoria::class, 'Categoria_id');
    }
}
