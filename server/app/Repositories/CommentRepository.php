<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Log;

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
        // Log::debug('CommentRepository initRequest(): ', ['request' => $request]);

        $query = $this->model->where('post_id', $request->post_id);

        if (!empty($request->parent_id) &&
            $request->parent_id != 0 &&
            $request->parent_id != null &&
            $request->parent_id != ''
        ) {
            $query = $query->where('parent_id', $request->parent_id);
        } else {
            $query = $query->where('parent_id', null);
        }

        return $query;
    }

    /**
     * Gets Comments with pagination
     *
     * @param object $request
     * @return object
     */
    public function getComments(object $request): object
    {
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

    /**
     * Destroys comment and its replies
     *
     * @param integer $commentId
     * @return void
     */
    public function destroyComment(int $commentId)
    {
        $this->destroy($commentId);
        $replies = $this->getReplies($commentId)->toArray();
        $this->destroyAllReplies($replies);
    }

    /**
     * Destroys comments that belongs to post
     *
     * @param integer $postId
     * @return void
     */
    public function destroyPostComments(int $postId)
    {
        $postComments = $this->model->where('post_id', $postId)->get()->toArray();
        $this->model->where('post_id', $postId)->delete();
        $replies = $this->getAllReplies($postComments);
        $this->destroyAllReplies($replies);
    }

    /**
     * Gets all replies for comments array
     *
     * @param array $comments
     * @return array
     */
    private function getAllReplies(array $comments): array
    {
        $replies = [];

        foreach ($comments as $comment) {
            $replies = array_merge($replies, $this->getReplies($comment['id'])->toArray());
        }

        return $replies;
    }

    /**
     * Gets replies by the parent_id
     *
     * @param integer $parentId
     * @return object|null
     */
    private function getReplies(int $parentId)
    {
        return $this->model->where('parent_id', $parentId)->get();
    }

    /**
     * Destroys comments by its array
     *
     * @param array $comments
     * @return void
     */
    private function destroyComments(array $comments)
    {
        foreach ($comments as $comment) {
            $this->destroy($comment['id']);
        }
    }

    /**
     * Destroys all replies
     *
     * @param array $replies
     * @return void
     */
    private function destroyAllReplies(array $replies)
    {
        if (count($replies)) {
            while(count($replies)) {
                $newReplies = $this->getAllReplies($replies);
                $this->destroyComments($replies);
                $replies = $newReplies;
            }
        }
    }
}
