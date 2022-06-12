/// <reference types="cypress" />

describe("dashboard-screen-1", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should see all projects & all gateways", () => {
    /** Check header */
    cy.get(".report-header-filter")
      .first()
      .should("have.text", "All projects | All gateways");

    /** See if all projects are seen */
    cy.get(".row-info").should("have.length", 2);
  });
});
