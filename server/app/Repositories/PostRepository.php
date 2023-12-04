<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\BaseRepository;

class PostRepository extends BaseRepository
{
    /**
    * Constructor.
    *
    * @var Post $model
    */
    public function __construct(Post $model)
    {
        $this->model = $model;
    }

    /**
     * Gets Posts using input parameters
     *
     * @param string $sort
     * @return array
     */
    public function getPosts(string|null $sort, string|null $search): array
    {
        $query = $this->model;

        if (strlen($sort) > 0) {
            $query = $query->orderBy($sort, 'ASC');
        }

        if (strlen($search) > 0) {
            $query = $query->where('title', 'like', "%{$search}%")
                ->orWhere('body', 'like', "%{$search}%");
        }

        return $query->get()->toArray();
    }
}
