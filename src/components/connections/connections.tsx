import { useQuery } from '@tanstack/react-query';

export const Connections = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['FETCH_CONNECTIONS'],
    queryFn: async () => {
      const fetchRespoonse = await fetch('http://localhost:8222/connz');
      const data = await fetchRespoonse.json();

      return data;
    },
  });

  if (isPending) {
    return <>Pending</>;
  }

  if (isError) {
    return <>Error in fetching connections</>;
  }

  return (
    <div>
      <h1>Connections</h1>
      <div>{data.server_id}</div>
    </div>
  );
};
