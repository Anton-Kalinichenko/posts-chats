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

    /**
     * Gets Comments using request parameters
     *
     * @param object $request
     * @return object
     */
    public function getComments(object $request): object
    {
        return $this->repo->getComments($request);
    }

    /**
     * Counts Comments
     *
     * @param object $request
     * @return integer
     */
    public function countComments(object $request): int
    {
        return $this->repo->countComments($request);
    }

    /**
     * Gets comments with extra data by request
     *
     * @param object $request
     * @return array
     */
    public function getCommentsByRequest(object $request): array
    {
        $comments = $this->getComments($request);
        $commentCount = $comments != null ? $this->countComments($request) : 0;
        $pageCount = $comments != null &&
            !empty($request->limit) &&
            $commentCount > 0 ?
                ceil($commentCount / $request->limit) :
                1;

        foreach ($comments as $key => $comment) {
            $comments[$key]->user = $comment->user;
        }

        return [
            'total' => $commentCount,
            'per_page' => !empty($request->limit) ? $request->limit : 1,
            'current_page' => !empty($request->page) ? (int) $request->page : 1,
            'last_page' => $pageCount,
            'data' => $comments != null ? $comments : [],
        ];
    }

    /**
     * Destroys comments that belongs to post
     *
     * @param integer $postId
     * @return void
     */
    public function destroyPostComments(int $postId)
    {
        $this->repo->destroyPostComments($postId);
    }
}
