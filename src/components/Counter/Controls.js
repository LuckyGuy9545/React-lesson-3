import React from 'react';

//== тут не прочтет this.handleIncrementЮ поэто передаем это через пропы
const Controls = ({ onIncrement, onDecrement }) => (
  <div className="Counter__controls">
    {/* //== onClick - это как слушатель, только работает как пропс */}
    <button type="button" onClick={onIncrement}>
      Увеличивает на 1
    </button>
    <button type="button" onClick={onDecrement}>
      Уменьшает на 1
    </button>
  </div>
);

export default Controls;
