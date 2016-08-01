jest.unmock('../App.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../App';

describe('render', () => {
  it('render', () => {

    const app = TestUtils.renderIntoDocument(
      <App />
    );
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toEqual('Hello');
  });
});
