<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\BaseRepository;

class CommentRepository extends BaseRepository
{
    /**
    * Constructor.
    *
    * @var Comment $model
    */
    public function __construct(Comment $model)
    {
        $this->model = $model;
    }
}
