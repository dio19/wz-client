import { render } from '@testing-library/react';
import UsersTable from './index';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Tests Users Table', () => {
  it('should match snapshot with true value', () => {
    const props = {
      isOpen: true,
    };

    const { asFragment } = render(<Router><UsersTable {...props} /></Router>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot with false', () => {
    const props = {
      isOpen: false,
    };

    const { asFragment } = render(<Router><UsersTable {...props} /></Router>);
    expect(asFragment()).toMatchSnapshot();
  });

});