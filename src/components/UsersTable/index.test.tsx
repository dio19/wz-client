import { render } from '@testing-library/react';
import UsersTable from './index';

describe('Tests Users Table', () => {
  it('should match snapshot with true value', () => {
    const props = {
      isOpen: true,
    };

    const { asFragment } = render(<UsersTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot with false', () => {
    const props = {
      isOpen: false,
    };

    const { asFragment } = render(<UsersTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

});