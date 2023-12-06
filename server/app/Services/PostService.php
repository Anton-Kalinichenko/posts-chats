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

    /**
     * Gets Posts using request parameters
     *
     * @param object $request
     * @return array
     */
    public function getPosts(object $request): array
    {
        return $this->repo->getPosts($request);
    }

    /**
     * Counts posts, appropriate to the filters
     *
     * @param object $request
     * @return integer
     */
    public function countPosts(object $request): int
    {
        return $this->repo->countPosts($request);
    }
}
