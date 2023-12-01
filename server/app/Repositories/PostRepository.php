<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Log;

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
    public function getPosts(string|null $sort): array
    {
        Log::debug('PostRepository getPosts()', ['sort' => $sort]);

        $query = $this->model;

        if (strlen($sort) > 0) {
            $query = $query->orderBy($sort, 'ASC');
        }

        Log::debug('PostService getPosts()', ['query' => $query]);

        return $query->get()->toArray();
    }
}
