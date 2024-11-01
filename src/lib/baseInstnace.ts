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
      const json = await res.json();
      throw new Error(json.message);
    }
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
};

export default baseIntance;
