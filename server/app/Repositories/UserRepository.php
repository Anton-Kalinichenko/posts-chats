<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    /**
    * Constructor.
    *
    * @var User $model
    */
    public function __construct(User $model)
    {
        $this->model = $model;
    }
}
