import * as React from "react";
import useFetch from "../../useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function SalesAgent() {
  //SALES AGENT FETCH
  const {
    data: salesAgent,
    loading: salesAgentLoading,
    error: salesAgentError,
  } = useFetch("https://crmables-backend.vercel.app/salesAgent");

  return (
    <>
      <main className="container-fluid my-5">
        <h1>Sales Agents List</h1>
        {/* SALES AGENT TABLE VIEW */}
        {salesAgentLoading && <Loading />}
        {salesAgentError && <Error />}
        {salesAgent && (
          <table class="table my-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {salesAgent?.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
