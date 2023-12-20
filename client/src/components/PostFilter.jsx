import React, { useState } from 'react';
import Select from './UI/select/Select';
import FormInput from './UI/input/FormInput';
import IconButton from './UI/button/IconButton';
import { ReactComponent as CircleXmark} from '../images/icons/circle-xmark-solid.svg';
import SimpleButton from './UI/button/SimpleButton';

const PostFilter = ({
    filter,
    limit,
    setFilter,
    setCurrentPage,
    fetchPosts,
}) => {
    return (
        <div className='d-flex'>
        <div>
          <h3 style={{marginLeft: '1em',}}>Sorting</h3>
          <Select
            defaultValue="None"
            options={[
              {value: 'title', name: 'By title'},
              {value: 'body', name: 'By content'},
            ]}
            value={filter.sort}
            onChange={ (selectedSort) => {setFilter({...filter, sort: selectedSort})} }
          />
        </div>
        <div>
          <h3 style={{marginLeft: '1em',}}>&nbsp;</h3>
          <div className='d-flex'>
            <FormInput
              type="text"
              placeholder="Search..."
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
            {filter.search.length > 0 &&
              <IconButton onClick={() => setFilter({...filter, search: ''})} title="Clear Search">
                <CircleXmark style={{width: 20, height: 20, marginTop: 17}} />
              </IconButton>
            }
          </div>
        </div>
        <div>
          <div>&nbsp;</div>
          <SimpleButton onClick={() => {
            setCurrentPage(1);
            fetchPosts({
              sort: filter.sort,
              search: filter.search,
              limit: limit,
              page: 1,
            });
          }} style={{marginTop: '17px',}}>Find</SimpleButton>
        </div>
      </div>
    );
}

export default PostFilter;
