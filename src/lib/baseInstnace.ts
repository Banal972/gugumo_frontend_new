'use server';

const baseIntance = async (url: string, options: RequestInit = {}) => {
  const { headers, ...restOptions } = options;

  try {
    const defaultOptions: RequestInit = {
      headers: {
        ...headers,
        'Content-Type': 'Application/json',
      },
      ...restOptions,
    };

    const res = await fetch(url, defaultOptions);
    if (!res.ok) {
      throw new Error('서버 에러가 발생했습니다.');
    }
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
};

export default baseIntance;
