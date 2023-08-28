<?php

namespace App\Models;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable =[
        'nome',
        'descricao',
        'quantidade',
        'imagem',
        'categoria_id',
    ];

    public function categorias(){
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }
}
