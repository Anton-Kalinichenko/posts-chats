<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\V1\AbstractApiController;
use Illuminate\Http\Request;
use App\Facades\PostFacade;
use Illuminate\Support\Facades\Log;

class PostController extends AbstractApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Log::debug('PostController index()', ['request' => $request->all()]);

        $posts = PostFacade::getPosts($request->sort, $request->search);

        return $this->responseJSON(
            __('posts.response.200.all'),
            200,
            $posts != null ? $posts : [],
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
