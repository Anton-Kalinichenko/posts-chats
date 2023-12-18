<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\AbstractApiController;
use App\Facades\CommentFacade;
use Illuminate\Support\Facades\Log;

class CommentController extends AbstractApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $responseData = CommentFacade::getCommentsByRequest($request);

        return $this->responseJSON(
            __('comments.response.200.all'),
            200,
            $responseData,
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $nowDate = new \DateTime('now');

        try {
            CommentFacade::create([
                'post_id' => $request->postId,
                'body' => $request->body,
                'user_id' => $request->userId,
                'parent_id' => $request->parentId,
                'created_at' => $nowDate,
                'updated_at' => $nowDate,
            ]);

            return $this->responseJSON(
                __('comments.response.200.store'),
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
     * Store a newly created resource in storage.
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
