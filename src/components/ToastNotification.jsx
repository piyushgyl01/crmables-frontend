export default function ToastNotification({ toastMessage, setShowToast }) {
  return (
    <>
      <div className="position-fixed top-0 end-0 p-3 mt-5" style={{ zIndex: 2050 }}>
        <div
          className="toast show mt-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </>
  );
}
