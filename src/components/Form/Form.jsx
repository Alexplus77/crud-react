import "../../App.css";

const Form = ({ handleSubmit, handleChange, value }) => (
  <form onSubmit={handleSubmit} className="form">
    <textarea value={value} onChange={handleChange} required={true} />
    <button className="btn-send" onSubmit={handleSubmit} disabled={!value}>
      {" "}
      <i className="fa fa-space-shuttle" aria-hidden="true" />
    </button>
  </form>
);

export { Form };
