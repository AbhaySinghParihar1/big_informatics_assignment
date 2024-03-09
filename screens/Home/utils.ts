export const fetchUsers = async (noOfUsers: number) => {
  const response = await fetch(
    `https://randomuser.me/api/?results=${noOfUsers}`
  ); // Replace with your actual API URL
  const json = await response.json();
  return json;
};
