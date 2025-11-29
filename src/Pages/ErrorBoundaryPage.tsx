import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const ErrorBoundaryPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="container mt-5">
        <h1 className="text-danger fw-bold">
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <Link className="link-danger" to={"/"}>
          Back to Login Page
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="container mt-5 text-danger">
        <h1 className="fw-bold">Error</h1>
        <p className="fw-semibold">{error.message}</p>
        <p className="fw-semibold">The stack trace is:</p>
        <pre className="text-black">{error.stack}</pre>
        <Link className="link-danger" to={"/"}>
          Back to Login Page
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <h1 className="text-danger">Unknown Error</h1>;
        <Link className="link-danger" to={"/"}>
          Back to Login Page
        </Link>
      </div>
    );
  }
  return <div className="container  mt-5">ErrorBoundaryPage</div>;
};

export default ErrorBoundaryPage;
