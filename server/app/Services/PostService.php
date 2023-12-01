<?php

namespace App\Services;

use App\Services\BaseService;
use App\Repositories\PostRepository;
use Illuminate\Support\Facades\Log;

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
     * Gets Posts using input parameters
     *
     * @param string $sort
     * @return array
     */
    public function getPosts(string|null $sort): array
    {
        Log::debug('PostService getPosts()', ['sort' => $sort]);

        return $this->repo->getPosts($sort);
    }
}
