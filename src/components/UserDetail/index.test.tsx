import { render, fireEvent, screen } from '@testing-library/react';
import UsersDetail from './index';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Tests Users Table', () => {

  it('should match snapshot', () => {

    const props = {
        eventHandler: jest.fn(),
    };
      
    const { asFragment } = render(<Router><UsersDetail {...props}/></Router>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test get back event handler', async () => {
    const props = {
      eventHandler: jest.fn(),
    };

    render(<Router><UsersDetail {...props}/></Router>);
    fireEvent.click(screen.getByRole('button'));
    expect(props.eventHandler).toBeCalled();
  });

});