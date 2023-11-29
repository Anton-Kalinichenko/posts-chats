<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    private $users = [];
    private const MOCK_DATA_SOURCE = 'https://jsonplaceholder.typicode.com';
    private const SHARED_PASSWORD = 'password';

    private function getUsers() {
        $response = Http::get(self::MOCK_DATA_SOURCE . '/users');

        if ($response->ok()) {
            $this->users = $response->json();
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->getUsers();

        $nowDate = new \DateTime('now');

        if (count($this->users)) {
            foreach ($this->users as $user) {
                DB::table('users')->insert([
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'email_verified_at' => $nowDate,
                    'password' => Hash::make(self::SHARED_PASSWORD),
                    'created_at' => $nowDate,
                    'updated_at' => $nowDate,
                ]);
            }
        }
    }
}
