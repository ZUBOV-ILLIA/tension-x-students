export const getStudents = async () => {
  const response = await fetch('https://test-task-j.herokuapp.com/data?page=1&size=30');

  if (!response.ok) {
    throw new Error('fail Fetch in getStudents point');
  }

  return response.json();
}