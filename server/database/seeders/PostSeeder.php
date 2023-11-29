<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PostSeeder extends Seeder
{
    private $posts = [];
    private const MOCK_DATA_SOURCE = 'https://jsonplaceholder.typicode.com';

    private function getPosts() {
        $response = Http::get(self::MOCK_DATA_SOURCE . '/posts');

        if ($response->ok()) {
            $this->posts = $response->json();
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->getPosts();

        $nowDate = new \DateTime('now');

        if (count($this->posts)) {
            foreach ($this->posts as $post) {
                DB::table('posts')->insert([
                    'user_id' => $post['userId'],
                    'title' => $post['title'],
                    'body' => $post['body'],
                    'created_at' => $nowDate,
                    'updated_at' => $nowDate,
                ]);
            }
        }
    }
}
