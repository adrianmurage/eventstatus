export default function NewEvent() {
  let currentDate = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <div className="container max-w-xs mx-auto pt-6">
        <p>Let's start with general details about your event</p>

        <div className="divider"></div>

        <form className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                What is the name of your event?
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Where will you be holding your event?
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                What date will your event be held
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              min={currentDate()}
            />
          </div>
        </form>
      </div>
    </>
  );
}
