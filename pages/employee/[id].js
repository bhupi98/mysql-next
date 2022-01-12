import EditEmployee from "../../components/EditEmployee";

function updateEmployee({ employee }) {
  console.log("employee", employee);
  return <EditEmployee employeeUpdateData={employee} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/employee/${params.id}`);
  const employee = await res.json();

  return {
    props: { employee },
  };
}

export default updateEmployee;
