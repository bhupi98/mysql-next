import EmployeeList from "../components/EmployeeList";
function employees({ data }) {
  console.log("data", data);
  return (
    <div>
      <EmployeeList employeeData={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://mysql-next.vercel.app/api/employee");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default employees;
