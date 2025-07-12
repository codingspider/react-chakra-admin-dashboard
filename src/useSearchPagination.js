import { useState, useEffect } from 'react';

export default function useSearchPagination(fetchDataFn, initialParams = {}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {

    const res = await fetchDataFn({ page, search, ...initialParams });
    setData(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    getData();
  }, [search, page]);

  return {
    data,
    total,
    loading,
    page,
    setPage,
    search,
    setSearch,
  };
}
