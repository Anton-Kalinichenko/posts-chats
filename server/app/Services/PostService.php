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

    /**
     * Gets posts with extra data by request
     *
     * @param object $request
     * @return array
     */
    public function getPostsByRequest(object $request): array
    {
        $posts = $this->getPosts($request);
        $postCount = $posts != null ? $this->countPosts($request) : 0;
        $pageCount = $posts != null &&
            !empty($request->limit) &&
            $postCount > 0 ?
                ceil($postCount / $request->limit) :
                1;

        return [
            'total' => $postCount,
            'per_page' => !empty($request->limit) ? $request->limit : 1,
            'current_page' => !empty($request->page) ? (int) $request->page : 1,
            'last_page' => $pageCount,
            'data' => $posts != null ? $posts : [],
        ];
    }
}
