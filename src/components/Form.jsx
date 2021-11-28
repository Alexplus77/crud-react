import "App.css";

const Form = ({ handleSubmit, handleChange, value }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea value={value} onChange={handleChange} required={true} />
      <button className="btn-send" onSubmit={handleSubmit}>
        {" "}
        <i className="fa fa-space-shuttle" aria-hidden="true" />
      </button>
    </form>
  );
};
export default Form;