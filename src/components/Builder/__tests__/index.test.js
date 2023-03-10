import Builder from '../index';
import * as React from 'react';
import {render} from '@testing-library/react';

const mockCollection = ['Location', 'Hotel', 'Flight', 'Car'];
const mockSetCollection = jest.fn();

describe('Builder', () => {
  it('should render correctly', () => {
    const {container} = render(<Builder collectionTypes={mockCollection} setCollectionTypes={mockSetCollection}/>);
    expect(container).toMatchSnapshot();
  });
});