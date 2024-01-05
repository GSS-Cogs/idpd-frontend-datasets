export default function Http404() {
  return (
    <div className="app-width-container">
      <main
        className="govuk-main-wrapper govuk-main-wrapper--l"
        id="main-content"
        role="main"
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Page not found</h1>
            <p className="govuk-body">
              If you typed the web address, check it is correct.
            </p>
            <p className="govuk-body">
              If you pasted the web address, check you copied the entire
              address.
            </p>
            <p className="govuk-body">
              If the web address is correct or you selected a link or button,{" "}
              <a href="#" className="govuk-link">
                please contact us
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
