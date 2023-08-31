<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Produtos>
 */
class ProdutosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome'=>$this->faker->name,
            'descricao'=>$this->faker->name,
            'quantidade'=>$this->faker->numberBetween(15, 100),
            'imagem'=>$this->faker->imageUrl(640, 480),
            'categoria_id'=>$this->faker->numberBetween(1, 10),
            
        ];
    }
}
