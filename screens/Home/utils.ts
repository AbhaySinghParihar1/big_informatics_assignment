export const fetchUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=10"); // Replace with your actual API URL
  const json = await response.json();
  return json;
};
