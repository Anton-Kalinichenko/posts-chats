<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use App\Repositories\BaseRepository;

abstract class BaseService
{
    protected $repo;

    /**
    * Constructor
    *
    * @var BaseRepository $repo
    */
    public function __construct(BaseRepository $repo)
    {
        $this->repo = $repo;
    }

    /**
    * Get all data
    *
    * @return Collection
    */
    public function all(): Collection
    {
        return $this->repo->all();
    }

    /**
    * Create new record
    *
    * @param array $input
    * @return model
    */
    public function create(array $data): Model
    {
        return $this->repo->create($data);
    }

    /**
    * Update data
    *
    * @param integer $id
    * @param array $data
    * @return model
    */
    public function update(string $id, array $data): Model
    {
        return $this->repo->update($id, $data);
    }

    /**
    * Delete record by id
    *
    * @param integer $id
    * @return boolean
    */
    public function destroy(int $id): bool
    {
        return $this->repo->destroy($id);
    }

    /**
     * Soft deletes records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkDestroy(array $ids)
    {
        $this->repo->bulkDestroy($ids);
    }

    /**
     * Restore the specified record from soft deleting.
     *
     * @param  int  $id
     * @return void
     */
    public function restore(int $id)
    {
        $this->repo->restore($id);
    }

    /**
     * Restores deleted records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkRestore(array $ids)
    {
        $this->repo->bulkRestore($ids);
    }

    /**
     * Ultimately destroy the specified record from storage.
     *
     * @param  int  $id
     * @return void
     */
    public function ultimatelyDestroy(int $id)
    {
        $this->repo->ultimatelyDestroy($id);
    }

    /**
     * Ultimately deletes records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkUltimatelyDestroy(array $ids)
    {
        $this->repo->bulkUltimatelyDestroy($ids);
    }

    /**
    * Find record by id
    *
    * @param int $id
    * @return Model
    */
    public function find(int $id): Model
    {
        return $this->repo->find($id);
    }

    /**
    * Find deleted record by id
    *
    * @param int $id
    * @return Model
    */
    public function findTrashed(int $id): Model
    {
        return $this->repo->findTrashed($id);
    }

    /**
    * Show the record with trashed by given id
    *
    * @param int $id
    * @return Model
    */
    public function findWithTrashed(int $id): Model
    {
        return $this->repo->findWithTrashed($id);
    }

    /**
     * Find record by any field and it value
     *
     * @param string $fieldName
     * @param [type] $value
     * @return object|null
     */
    public function findByField(string $fieldName, $value): object|null
    {
        return $this->repo->findByField($fieldName, $value);
    }

    /**
    * Show the first record from the database
    *
    * @return model
    */
    public function first(): Model
    {
        return $this->repo->first();
    }

    /**
    * Show the latest record from the database
    *
    * @return model
    */
    public function last(): Model
    {
        return $this->repo->last();
    }

    /**
    * Get the associated model
    *
    * @return Model
    */
    public function getModel(): Model
    {
        return $this->repo->getModel();
    }

    /**
    * Set the associated model
    *
    * @param $model
    * @return $this
    */
    public function setModel(Model $model)
    {
        $this->repo->setModel($model);
        return true;
    }

    /**
     * count records
     *
     * @return integer
     */
    public function count(string $fieldName, mixed $value): int
    {
        return $this->repo->count($fieldName, $value);
    }

}
