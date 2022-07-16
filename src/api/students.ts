export const getStudents = async (page: number, rows: number, query: string, sortBy: string) => {
  const response = await fetch(`https://test-task-j.herokuapp.com/data?page=${page}&size=${rows}&search=${query}${sortBy}`);

  if (!response.ok) {
    throw new Error('fail Fetch in getStudents point');
  }

  return response.json();
}