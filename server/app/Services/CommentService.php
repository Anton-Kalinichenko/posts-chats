<?php

namespace App\Services;

use App\Services\BaseService;
use App\Repositories\CommentRepository;

class CommentService extends BaseService
{
    /**
    * Constructor.
    *
    * @var CommentRepository $repo
    */
    public function __construct(CommentRepository $repo)
    {
        $this->repo = $repo;
    }
}
