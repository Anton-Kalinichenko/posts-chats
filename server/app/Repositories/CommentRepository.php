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

    /**
     * Inits requests for getting comments
     *
     * @param object $request
     * @return object
     */
    private function initRequest(object $request)
    {
        return $this->model->where('post_id', $request->post_id);
    }

    /**
     * Gets Comments with pagination
     *
     * @param object $request
     * @return object
     */
    public function getComments(object $request): object
    {
        // dd($request);

        $query = $this->initRequest($request);

        if (!empty($request->limit) && $request->limit > 0) {
            if (!empty($request->page) && $request->page > 0) {
                $query = $query->skip(($request->page - 1) * $request->limit);
            }

            $query = $query->take($request->limit);
        }

        return $query->orderBy('created_at', 'DESC')
            ->get();
    }

    /**
     * Counts found comments
     *
     * @param object $request
     * @return integer
     */
    public function countComments(object $request): int
    {
        return $this->initRequest($request)->count();
    }
}
