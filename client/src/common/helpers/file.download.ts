export const fileDownload = async (src: string) => {
  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.text();
  } catch (error) {
    const err = error as Error;
    alert(err.message);
  }
};

