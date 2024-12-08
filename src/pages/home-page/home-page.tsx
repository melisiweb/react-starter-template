import { Connections } from '@/components/connections/connections';
import { Counter } from '@/components/counter/counter';
import { LoginForm } from '@/forms';

export const HomePage = () => {
  return (
    <div>
      <h1>
        <Connections />

        <Counter />

        <LoginForm onLogin={(data) => console.log(data)} />
      </h1>
    </div>
  );
};
