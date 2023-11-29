<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface BaseInterface
{
    public function all();

    public function create(array $data);

    public function update(int $id, array $data);

    public function destroy(int $id);

    public function bulkDestroy(array $ids);

    public function restore(int $id);

    public function bulkRestore(array $ids);

    public function ultimatelyDestroy(int $id);

    public function bulkUltimatelyDestroy(array $ids);

    public function find(int $id);

    public function findTrashed(int $id);

    public function findWithTrashed(int $id);

    public function findByField(string $fieldName, $value);

    public function first();

    public function last();

    public function getModel(): Model;

    public function setModel(Model $model);

    public function count(string $fieldName, mixed $value);
}
