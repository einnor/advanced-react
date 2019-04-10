import React from 'react';
// import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArticleList from '../ArticleList';
import Article from '../Article';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

Article.propTypes = {};

describe('ArticleList', () => {

  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'b' },
    },
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    // expect(wrapper.node.props.children.length).toBe(2);
    expect(wrapper.find(Article).length).toBe(2);

    expect(wrapper).toMatchSnapshot();
  });

});