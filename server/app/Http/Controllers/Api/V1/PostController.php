<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\V1\AbstractApiController;
use Illuminate\Http\Request;
use App\Facades\PostFacade;
use App\Facades\CommentFacade;
use Illuminate\Support\Facades\Log;
use \Carbon\Carbon;

class PostController extends AbstractApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $responseData = PostFacade::getPostsByRequest($request);

        return $this->responseJSON(
            __('posts.response.200.all'),
            200,
            $responseData,
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $nowDate = new \DateTime('now');

        try {
            PostFacade::create([
                'user_id' => $request->userId,
                'title' => $request->title,
                'body' => $request->body,
                'created_at' => $nowDate,
                'updated_at' => $nowDate,
            ]);

            return $this->responseJSON(
                __('posts.response.200.store'),
                200,
                [],
            );
        } catch (\Exception $e) {
            Log::error($e);

            return $this->responseJSON(
                __('posts.response.500'),
                500,
                [],
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $post = PostFacade::find($id);

            if ($post) {
                $post->user = $post->user;
                $post = $post ? $post->toArray() : [];

                $commentRequest = [];
                $commentRequest['post_id'] = $post['id'];
                $commentRequest['limit'] = 10;
                $commentRequest['page'] = 1;
                $post['comments'] = CommentFacade::getCommentsByRequest((object) $commentRequest);
            }

            return $this->responseJSON(
                __('posts.response.200.show'),
                200,
                $post ?? [],
            );
        } catch (\Exception $e) {
            Log::error($e);

            return $this->responseJSON(
                __('posts.response.500'),
                500,
                [],
            );
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $nowDate = new \DateTime('now');

        try {
            $dataToUpdate = [
                'title' => $request->title,
                'body' => $request->body,
                'updated_at' => $nowDate,
            ];

            PostFacade::update($id, $dataToUpdate);

            return $this->responseJSON(
                __('posts.response.200.update'),
                200,
                [],
            );
        } catch (\Exception $e) {
            Log::error($e);

            return $this->responseJSON(
                __('posts.response.500'),
                500,
                [],
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            PostFacade::destroy($id);

            return $this->responseJSON(
                __('posts.response.200.destroy'),
                200,
                [],
            );
        } catch (\Exception $e) {
            Log::error($e);

            return $this->responseJSON(
                __('posts.response.500'),
                500,
                [],
            );
        }
    }
}
