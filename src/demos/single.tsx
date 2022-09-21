import React from 'react';
import InputNumberRange from '../index';
import 'antd/dist/antd.less';
import './index.less';

export default () => {
  const props = {
    value: [1,2],
  };

  return (
    <>
      <InputNumberRange {...props}>
      </InputNumberRange>
    </>
  );
};
