<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([

        	'name' => 'admin',
            'rol_id' => 1,
        	'email' => 'admin@gmail.com',
        	'password' => Hash::make(12345)

        ]);

         User::create([

            'name' => 'encargado',
            'rol_id' => 2,
            'email' => 'encargado@gmail.com',
            'password' => Hash::make(12345)

        ]);

         User::create([

            'name' => 'ramon',
            'rol_id' => 1,
            'email' => 'villalobosantonio79@gmail.com',
            'password' => Hash::make(12345)

        ]);
    }
}
