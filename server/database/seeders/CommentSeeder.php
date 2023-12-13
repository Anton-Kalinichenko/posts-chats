<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CommentSeeder extends Seeder
{
    private $comments = [];
    private const MOCK_DATA_SOURCE = 'https://jsonplaceholder.typicode.com';

    private function getUsers() {
        $response = Http::get(self::MOCK_DATA_SOURCE . '/comments');

        if ($response->ok()) {
            $this->comments = $response->json();
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->getUsers();

        $nowDate = new \DateTime('now');

        if (count($this->comments)) {
            $userId = 1;

            foreach ($this->comments as $comment) {
                if ($userId > 10) {
                    $userId = 1;
                }

                DB::table('comments')->insert([
                    'post_id' => $comment['postId'],
                    'user_id' => $userId,
                    'body' => $comment['body'],
                    'created_at' => $nowDate,
                    'updated_at' => $nowDate,
                ]);

                $userId++;
            }
        }
    }
}
