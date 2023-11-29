<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class UserFacade extends Facade
{
    public static function getFacadeAccessor()
	{
        return 'UserFacade';
    }
}
