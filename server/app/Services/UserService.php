<?php

namespace App\Services;

use App\Services\BaseService;
use App\Repositories\UserRepository;

class UserService extends BaseService
{
    /**
    * Constructor.
    *
    * @var UserRepository $repo
    */
    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }
}
