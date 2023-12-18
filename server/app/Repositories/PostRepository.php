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
     * Inits requests for getting posts, appropriate to filters
     *
     * @param object $request
     * @return object
     */
    private function initRequest(object $request)
    {
        $query = $this->model;

        if ($request->exists('sort') && strlen($request->sort) > 0) {
            $query = $query->orderBy($request->sort, 'ASC');
        }

        if ($request->exists('search') && strlen($request->search) > 0) {
            $query = $query->where('title', 'like', "%{$request->search}%")
                ->orWhere('body', 'like', "%{$request->search}%");
        }

        return $query;
    }

    /**
     * Gets Posts using request parameters with pagination
     *
     * @param object $request
     * @return array
     */
    public function getPosts(object $request): array
    {
        $query = $this->initRequest($request);

        if (isset($request->limit) && $request->limit > 0) {
            if (isset($request->page) && $request->page > 0) {
                $query = $query->skip(($request->page - 1) * $request->limit);
            }

            $query = $query->take($request->limit);
        }

        return $query->get()->toArray();
    }

    /**
     * Counts posts, appropriate to the filters
     *
     * @param object $request
     * @return integer
     */
    public function countPosts(object $request): int
    {
        return $this->initRequest($request)->count();
    }
}
