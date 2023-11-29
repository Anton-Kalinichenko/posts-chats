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
    public function index()
    {
        $index = 'index';

        Log::debug('PostController', ['method' => $index]);

        $posts = PostFacade::all();

        return $this->responseJSON(
            __('posts.response.200.all'),
            200,
            $posts != null ? $posts->toArray() : []
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
