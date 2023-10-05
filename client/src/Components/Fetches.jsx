export const fetchEmployees = async () => {
  const res = await fetch("/api/employees");
  return await res.json();
};
export const deleteEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
  return await res.json();
};
export const updateEmployee = (id, present) => {
  return fetch(`/api/employees/present/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "present": `${present}` }),
  }).then((res) => res.json());
};

export const sortEmployees = async (sortMethod) => {
  const res = await fetch(`/api/employees/sort?sortMethod=${sortMethod}`)
  return await res.json()
} 

export const fetchCompanies = async () => {
  const res = await fetch("api/companies/")
  return await res.json()
}