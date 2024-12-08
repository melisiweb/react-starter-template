import { useAppStore } from '@/stores/app-store';

export const Counter = () => {
  const { count, increment, decrement } = useAppStore((state) => state);
  return (
    <div>
      <h1>Counter</h1>
      <div>Counter {count}</div>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
