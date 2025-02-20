export default function NotFound({ heading, message }) {
  return (
    <div className="text-center py-5 text-muted">
      <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
      <h5>{heading}</h5>
      <p className="mb-0">{message}</p>
    </div>
  );
}
