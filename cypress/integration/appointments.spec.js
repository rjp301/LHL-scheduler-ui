/* global cy */

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("http://localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it.skip("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.get(".button--confirm").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it.skip("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[alt='Tori Malcolm']").click();
    cy.get(".button--confirm").click();
    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
