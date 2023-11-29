<?php

namespace App\Services;

use App\Services\BaseService;
use App\Repositories\PostRepository;

class PostService extends BaseService
{
    /**
    * Constructor.
    *
    * @var PostRepository $repo
    */
    public function __construct(PostRepository $repo)
    {
        $this->repo = $repo;
    }
}
