import React from 'react';
import ReactDOM from 'react-dom';
import Continents from './Continents';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Continents />, div);
    ReactDOM.unmountComponentAtNode(div);
});
