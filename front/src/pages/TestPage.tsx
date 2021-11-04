import React from 'react';

const TestPage = () => {
  return (
    <div>
      <form action="http://localhost:3000/s3" method="post" encType="multipart/form-data">
        <input name="upload" type="file" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default TestPage;
