import React, { PureComponent } from 'react';

//== можно использовать у Реакта {PureComponent}, в нем под капотом еслть метод shouldComponentUpdate
export default class Tabs extends PureComponent {
  state = {
    activeTabIndex: 0,
  };

  //-- этот метод устаревший
  //   //*метод позволяет избежать лишнего перерендера, делая рамки при каких нужно обновить или нет
  //   shouldComponentUpdate(nextProps, nextState) {
  //     //* если индекс следующего состояния будет отличаться(неравно) своему индексу нынешнего состояния - сделай обновление
  //     return nextState.activeTabIndex !== this.state.activeTabIndex;
  //   }

  setActiveIndex = index => {
    this.setState({ activeTabIndex: index });
  };

  render() {
    console.log(`Re-render @ ${Date.now()}`);
    const { activeTabIndex } = this.state;
    const { items } = this.props;
    const activeTab = items[activeTabIndex];

    return (
      <>
        <div>
          {items.map((item, index) => (
            <button
              type="buttton"
              key={item.label}
              onClick={() => this.setActiveIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h2>{activeTab.label}</h2>
          <p>{activeTab.content}</p>
        </div>
      </>
    );
  }
}
