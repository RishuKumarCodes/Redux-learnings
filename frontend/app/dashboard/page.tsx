"use client";
import withAuth from "../hoc/withAuth.js";

function Dashboard() {
  return <div>Welcome to the dashboard!</div>;
}

export default withAuth(Dashboard);
