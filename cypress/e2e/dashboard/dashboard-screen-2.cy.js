/// <reference types="cypress" />

describe("dashboard-screen-2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    const url = "http://178.63.13.157:8090/mock-api/api";

    cy.intercept({ method: "POST", url: `${url}/report` }).as("report");
  });

  it("should see all projects & gateway 1", () => {
    /** Generate report with gateway 1 */
    cy.contains("All gateways")
      .click()
      .type("{downarrow}{downarrow}{downarrow}{enter}");
    cy.contains("Generate report").click();

    /** Wait until you get report */
    cy.wait("@report").its("response.statusCode").should("eq", 200);

    /** Check header */
    cy.get(".report-header-filter")
      .first()
      .should("have.text", "All projects | Gateway 1");

    /** See if all gateways are seen */
    cy.get(".row-info").should("have.length", 2);
    cy.get(".row-info")
      .first()
      .should("have.text", "Project 1TOTAL: 59,708.57 USD");
    cy.get(".row-info")
      .last()
      .should("have.text", "Project 2TOTAL: 63,609.82 USD");

    cy.get(".report-footer-total").should(
      "have.text",
      "GATEWAY TOTAL | 123,318.39 USD"
    );
  });
});
