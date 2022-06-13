import { render } from '@testing-library/react';
import Tasks from './index';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Tests Tasks Table', () => {

  beforeAll(() => jest.spyOn(window, 'fetch'))
  
    it('should match snapshot with true value', () => {
      const props = {
        isOpen: true,
      };
  
      const { asFragment } = render(<Router><Tasks {...props} /></Router>);
      expect(asFragment()).toMatchSnapshot();
    });
  
    it('should match snapshot with false', () => {
      const props = {
        isOpen: false,
      };
  
      const { asFragment } = render(<Router><Tasks {...props} /></Router>);
      expect(asFragment()).toMatchSnapshot();
    });
  
  });