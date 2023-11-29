<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

abstract class AbstractApiController extends Controller
{
    /**
     * Response JSON format
     *
     * @param string $message
     * @param integer $code
     * @param array $data
     *
     * @return JsonResponse
     */
    protected function responseJSON(string $message, int $code = 200, array $data = []): JsonResponse
    {
        $json = [
            'success'   => $code === 200 ? true : false,
            'message'   => $message,
            'data'      => [],
            'version'   => 'v1',
        ];

        if (!empty($data)) {
            $json['data'] = $data;
        }

        return response()->json($json, $code);
    }
}
