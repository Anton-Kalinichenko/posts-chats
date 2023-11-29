<?php


namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\Interfaces\BaseInterface;
use Illuminate\Support\Collection;

abstract class BaseRepository implements BaseInterface
{
    protected $model;

    public $sortBy = 'id';
    public $sortOrder = 'asc';

    /**
    * Constructor.
    *
    * @var Model $model
    */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
    * Get all instances of model
    *
    * @return Collection
    */
    public function all(): Collection
    {
        return $this->model
            ->orderBy($this->sortBy, $this->sortOrder)
            ->get();
    }

    /**
    * Create a new record in the database
    *
    * @param array $data
    * @return model
    */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
    * Update record in the database and get data back
    *
    * @param int $id
    * @param array $data
    * @return model
    */
    public function update(int $id, array $data): Model
    {
        //$query = $this->model->where('id', $id);
        return $query = $this->model->updateOrCreate(['id' => $id], $data);
    }

    /**
    * Remove record from the database
    *
    * @param int $id
    * @return boolean
    */
    public function destroy(int $id): bool
    {
        $this->model->destroy($id);
        return true;
    }

    /**
     * Soft deletes records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkDestroy(array $ids)
    {
        $this->model
            ->whereIn('id', $ids)
            ->delete();
    }

    /**
     * Restore the specified record from soft deleting.
     *
     * @param  int  $id
     * @return void
     */
    public function restore(int $id)
    {
        $this->model
            ->onlyTrashed()
            ->find($id)
            ->restore();
    }

    /**
     * Restores deleted records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkRestore(array $ids)
    {
        $this->model
            ->onlyTrashed()
            ->whereIn('id', $ids)
            ->restore();
    }

    /**
     * Ultimately destroy the specified record from storage.
     *
     * @param  int  $id
     * @return void
     */
    public function ultimatelyDestroy(int $id)
    {
        $this->model
            ->where('id', $id)
            ->forceDelete();
    }

    /**
     * Ultimately deletes records by the array of ids.
     *
     * @param  array  $ids
     * @return void
     */
    public function bulkUltimatelyDestroy(array $ids)
    {
        $this->model
            ->whereIn('id', $ids)
            ->forceDelete();
    }

    /**
    * Show the record with the given id
    *
    * @param int $id
    * @return object|null
    */
    public function find(int $id): object|null
    {
        return $this->model->find($id);
    }

    /**
    * Show the trashed record by given id
    *
    * @param int $id
    * @return object|null
    */
    public function findTrashed(int $id): object|null
    {
        return $this->model->onlyTrashed()->find($id);
    }

    /**
    * Show the record with trashed by given id
    *
    * @param int $id
    * @return object|null
    */
    public function findWithTrashed(int $id): object|null
    {
        return $this->model->withTrashed()->find($id);
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
        return $this->model->where($fieldName, $value)->get();
    }

    /**
    * Show the first record from the database
    *
    * @return model
    */
    public function first(): Model
    {
        return $this->model->first();
    }

    /**
    * Show the latest record from the database
    *
    * @return model
    */
    public function last(): Model
    {
        return $this->model->latest()->first();
    }

    /**
    * Get the associated model
    *
    * @return Model
    */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
    * Set the associated model
    *
    * @param $model
    * @return $this
    */
    public function setModel(Model $model)
    {
        $this->model = $model;
        return true;
    }

    /**
     * Get count of model
     *
     * @return integer
     */
    public function count(string $fieldName, mixed $value): int
    {
        return $this->model->where($fieldName, $value)->count();
    }

}
