const Loader = ({ isLoading, children }) => {
    return (
      <div>
        {isLoading ? (
          <div className="row justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden text-white">Loading...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  };
  
  export default Loader;