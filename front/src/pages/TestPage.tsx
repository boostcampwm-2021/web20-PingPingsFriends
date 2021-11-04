import React from 'react';
import Config from '../lib/constants/config';

const TestPage = () => {
  return (
    <div>
      <form action={Config.BACK_HOST + '/s3'} method="post" encType="multipart/form-data">
        <input name="upload" type="file" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default TestPage;
