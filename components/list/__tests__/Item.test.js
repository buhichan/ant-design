import React from 'react';
import { render, mount } from 'enzyme';
import List from '..';
import ConfigProvider from '../../config-provider';

describe('List Item Layout', () => {
  const data = [
    {
      key: 1,
      href: 'https://ant.design',
      title: `ant design`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      extra: 'extra',
    },
  ];

  it('horizontal itemLayout List which contains string nodes should not be flex container', () => {
    const wrapper = mount(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            I am <span>ant</span> design list item
          </List.Item>
        )}
      />,
    );
    expect(wrapper.find('.ant-list-item').at(0).hasClass('ant-list-item-no-flex')).toBe(true);
  });

  it('horizontal itemLayout List should be flex container defaultly', () => {
    const wrapper = mount(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(wrapper.find('.ant-list-item').at(0).hasClass('ant-list-item-no-flex')).toBe(false);
  });

  it('vertical itemLayout List should be flex container when there is extra node', () => {
    const wrapper = mount(
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title} extra={item.extra}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(wrapper.find('.ant-list-item').at(0).hasClass('ant-list-item-no-flex')).toBe(false);
  });

  it('vertical itemLayout List should not be flex container when there is not extra node', () => {
    const wrapper = mount(
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(wrapper.find('.ant-list-item').at(0).hasClass('ant-list-item-no-flex')).toBe(true);
  });

  it('horizontal itemLayout List should accept extra node', () => {
    const wrapper = mount(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<a key="action">Action</a>]}
            extra={<span>{item.extra}</span>}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should render in RTL direction', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<a key="action">Action</a>]}
              extra={<span>{item.extra}</span>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </ConfigProvider>,
    );
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('rowKey could be string', () => {
    const dataWithId = [
      {
        id: 1,
        title: `ant design`,
      },
      {
        id: 2,
        title: `ant design`,
      },
      {
        id: 3,
        title: `ant design`,
      },
    ];
    const wrapper = mount(
      <List
        dataSource={dataWithId}
        rowKey="id"
        renderItem={item => <List.Item>{item.title}</List.Item>}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('rowKey could be function', () => {
    const dataWithId = [
      {
        id: 1,
        title: `ant design`,
      },
      {
        id: 2,
        title: `ant design`,
      },
      {
        id: 3,
        title: `ant design`,
      },
    ];
    const wrapper = mount(
      <List
        dataSource={dataWithId}
        rowKey={item => item.id}
        renderItem={item => <List.Item>{item.title}</List.Item>}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('forwards ref to the inner HTMLElement', () => {
    const dataWithId = [
      {
        id: 1,
        title: `ant design`,
      },
    ];
    const ref1 = React.createRef();
    const ref3 = React.createRef();
    mount(
      <List
        ref={ref3}
        dataSource={dataWithId}
        rowKey={item => item.id}
        renderItem={item => <List.Item ref={ref1}>{item.title}</List.Item>}
      />,
    );

    expect(ref1.current).toBeInstanceOf(HTMLElement);
    expect(ref3.current).toBeInstanceOf(HTMLElement);

    const ref2 = React.createRef();
    mount(
      <List
        grid={{ column: 2 }}
        dataSource={dataWithId}
        rowKey={item => item.id}
        renderItem={item => <List.Item ref={ref2}>{item.title}</List.Item>}
      />,
    );

    expect(ref2.current).toBeInstanceOf(HTMLElement);
  });
});
